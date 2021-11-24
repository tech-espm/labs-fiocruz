import app = require("teem");
import { randomBytes } from "crypto";
import appsettings = require("../appsettings");
import DataUtil = require("../utils/dataUtil");
import Email = require("../utils/email");
import GeradorHash = require("../utils/geradorHash");
import intToHex = require("../utils/intToHex");
import Perfil = require("../enums/perfil");
import SafeBase64 = require("../utils/safeBase64");
import Validacao = require("../utils/validacao");

interface Usuario {
	id: number;
	email: string;
	nome: string;
	idperfil: Perfil;
	senha: string;
	confirmado: number;
	criacao: string;

	// Utilizados apenas através do cookie
	admin: boolean;
}

class Usuario {
	private static readonly IdAdmin = 1;

	public static async cookie(req: app.Request, res: app.Response = null, admin: boolean = false): Promise<Usuario> {
		let cookieStr = req.cookies[appsettings.cookie] as string;
		if (!cookieStr || cookieStr.length !== 48) {
			if (res) {
				res.statusCode = 403;
				res.json("Não permitido");
			}
			return null;
		} else {
			let id = parseInt(cookieStr.substr(0, 8), 16) ^ appsettings.usuarioHashId;
			let usuario: Usuario = null;

			await app.sql.connect(async (sql) => {
				let rows = await sql.query("select id, email, nome, idperfil, token from usuario where id = ?", [id]);
				let row: any;

				if (!rows || !rows.length || !(row = rows[0]))
					return;

				let token = cookieStr.substring(16);

				if (!row.token || token !== (row.token as string))
					return;

				usuario = new Usuario();
				usuario.id = id;
				usuario.email = row.email as string;
				usuario.nome = row.nome as string;
				usuario.idperfil = row.idperfil as number;
				usuario.admin = (usuario.idperfil === Perfil.Administrador);
			});

			if (admin && usuario && usuario.idperfil !== Perfil.Administrador)
				usuario = null;
			if (!usuario && res) {
				res.statusCode = 403;
				res.json("Não permitido");
			}
			return usuario;
		}
	}

	private static gerarTokenCookie(id: number): [string, string] {
		let idStr = intToHex(id ^ appsettings.usuarioHashId);
		let idExtra = intToHex(0);
		let token = randomBytes(16).toString("hex");
		let cookieStr = idStr + idExtra + token;
		return [token, cookieStr];
	}

	public static async efetuarLogin(email: string, senha: string, res: app.Response): Promise<[string, Usuario]> {
		if (!email || !senha)
			return ["Usuário ou senha inválidos", null];

		return await app.sql.connect(async (sql) => {
			email = email.normalize().trim().toLowerCase();

			const usuarios: Usuario[] = await sql.query("select id, nome, idperfil, senha, confirmado from usuario where email = ? and exclusao is null", [email]);
			let usuario: Usuario;

			if (!usuarios || !usuarios.length || !(usuario = usuarios[0]) || !(await GeradorHash.validarSenha(senha.normalize(), usuario.senha as string)))
				return ["Usuário ou senha inválidos", null];

			if (!usuarios[0].confirmado)
				return ["Por favor, siga as instruções enviadas para o e-mail " + email + " para confirmar a criação de sua conta", null];

			let [token, cookieStr] = Usuario.gerarTokenCookie(usuario.id);

			await sql.query("update usuario set token = ? where id = ?", [token, usuario.id]);

			usuario.admin = (usuario.idperfil === Perfil.Administrador);

			res.cookie(appsettings.cookie, cookieStr, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true, path: "/", secure: appsettings.cookieSecure });

			return [null, usuario];
		});
	}

	public static async efetuarLogout(usuario: Usuario, res: app.Response): Promise<void> {
		await app.sql.connect(async (sql) => {
			await sql.query("update usuario set token = null where id = ?", [usuario.id]);

			res.cookie(appsettings.cookie, "", { expires: new Date(0), httpOnly: true, path: "/", secure: appsettings.cookieSecure });
		});
	}

	public static async alterarPerfil(usuario: Usuario, res: app.Response, nome: string, senhaAtual: string, novaSenha: string): Promise<string> {
		nome = (nome || "").normalize().trim();
		if (nome.length < 3 || nome.length > 100)
			return "Nome inválido";

		if (!!senhaAtual !== !!novaSenha || (novaSenha && (novaSenha.length < 6 || novaSenha.length > 20)))
			return "Senha inválida";

		let r: string = null;

		await app.sql.connect(async (sql) => {
			if (senhaAtual) {
				let hash = await sql.scalar("select senha from usuario where id = ?", [usuario.id]) as string;
				if (!await GeradorHash.validarSenha(senhaAtual.normalize(), hash)) {
					r = "Senha atual não confere";
					return;
				}

				hash = await GeradorHash.criarHash(novaSenha.normalize());

				let [token, cookieStr] = Usuario.gerarTokenCookie(usuario.id);

				await sql.query("update usuario set nome = ?, senha = ?, token = ? where id = ?", [nome, hash, token, usuario.id]);

				res.cookie(appsettings.cookie, cookieStr, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true, path: "/", secure: appsettings.cookieSecure });
			} else {
				await sql.query("update usuario set nome = ? where id = ?", [nome, usuario.id]);
			}
		});

		return r;
	}

	private static validar(usuario: Usuario, criacao: boolean): string {
		if (!usuario)
			return "Usuário inválido";

		usuario.id = parseInt(usuario.id as any);

		if (criacao) {
			// Limita o e-mail a 85 caracteres para deixar 15 sobrando, para tentar evitar perda de dados durante a concatenação da exclusão
			if (!usuario.email || !Validacao.isEmail(usuario.email = usuario.email.normalize().trim().toLowerCase()) || usuario.email.length > 85)
				return "E-mail inválido";
		} else {
			if (isNaN(usuario.id))
				return "Id inválido";
		}

		if (!usuario.nome || !(usuario.nome = usuario.nome.normalize().trim()) || usuario.nome.length > 100)
			return "Nome inválido";

		if (isNaN(usuario.idperfil = parseInt(usuario.idperfil as any) as Perfil))
			return "Perfil inválido";

		if (criacao) {
			if (!usuario.senha || (usuario.senha = usuario.senha.normalize()).length < 6 || usuario.senha.length > 20)
				return "Senha inválida";
		}

		return null;
	}

	public static async listar(): Promise<Usuario[]> {
		let lista: Usuario[] = null;

		await app.sql.connect(async (sql) => {
			lista = await sql.query("select u.id, u.email, u.nome, p.nome perfil, date_format(u.criacao, '%d/%m/%Y') criacao from usuario u inner join perfil p on p.id = u.idperfil where u.exclusao is null order by u.email asc") as Usuario[];
		});

		return (lista || []);
	}

	public static async obter(id: number): Promise<Usuario> {
		let lista: Usuario[] = null;

		await app.sql.connect(async (sql) => {
			lista = await sql.query("select id, email, nome, idperfil, date_format(criacao, '%d/%m/%Y') criacao from usuario where id = ?", [id]) as Usuario[];
		});

		return ((lista && lista[0]) || null);
	}

	public static async criar(usuario: Usuario, confirmado: number): Promise<string> {
		let res: string;
		if ((res = Usuario.validar(usuario, true)))
			return res;

		await app.sql.connect(async (sql) => {
			try {
				await sql.query("insert into usuario (email, nome, idperfil, senha, confirmado, criacao) values (?, ?, ?, ?, ?, now())", [usuario.email, usuario.nome, usuario.idperfil, await GeradorHash.criarHash(usuario.senha), confirmado]);

				usuario.id = await sql.scalar("select last_insert_id()");
			} catch (e) {
				if (e.code) {
					switch (e.code) {
						case "ER_DUP_ENTRY":
							res = `O e-mail ${usuario.email} já está em uso`;
							break;
						case "ER_NO_REFERENCED_ROW":
						case "ER_NO_REFERENCED_ROW_2":
							res = "Perfil não encontrado";
							break;
						default:
							throw e;
					}
				} else {
					throw e;
				}
			}
		});

		return res;
	}

	public static async criarExterno(usuario: Usuario): Promise<string | null> {
		if (usuario)
			usuario.idperfil = Perfil.Comum;

		return await Usuario.criar(usuario, 0) || await app.sql.connect(async (sql) => {
			const tokenreset = randomBytes(32).toString("hex"),
				id = "0000000" + (usuario.id ^ appsettings.usuarioHashId).toString(16),
				buffer = Buffer.from(id.substr(id.length - 8) + tokenreset, "utf-8");

			for (let i = buffer.length - 1; i >= 0; i--)
				buffer[i] ^= 0x55;

			await sql.query("update usuario set tokenreset = ? where id = ?", [tokenreset, usuario.id]);

			const link = appsettings.urlSite + app.root + "/confirmacao?" + SafeBase64.encode(buffer),
				html = `
					<p>Olá, ${usuario.nome}!</p>
					<p>Por favor, confirme seu e-mail clicando no link <a target="_blank" href="${link}">${link}</a></p>
				`;

			await Email.enviar({
				to: usuario.email,
				subject: "terra 2030 - Confirmação de e-mail",
				html: html
			});

			return null;
		});
	}

	public static async confirmarEmail(safeBase64Hash: string | null): Promise<string | null> {
		if (!safeBase64Hash)
			return "Informações inválidas";

		let id: number, tokenreset: string;

		try {
			const buffer = SafeBase64.decode(safeBase64Hash);
			for (let i = buffer.length - 1; i >= 0; i--)
				buffer[i] ^= 0x55;

			const idTokenreset = buffer.toString("utf-8");
			if (idTokenreset.length < 32)
				return "Informações de confirmação de e-mail inválidas";

			id = parseInt(idTokenreset.substr(0, 8), 16);
			if (isNaN(id))
				return "Informações de confirmação de e-mail inválidas";

			id ^= appsettings.usuarioHashId;
			tokenreset = idTokenreset.substr(8);
		} catch (ex: any) {
			return "Informações de confirmação de e-mail inválidas";
		}

		return app.sql.connect(async (sql) => {
			const usuarios: { id: number, confirmado: number, tokenreset: string }[] = await sql.query("select id, confirmado, tokenreset from usuario where id = ?", [id]);

			if (!usuarios || !usuarios.length)
				return "Usuário não encontrado";

			if (usuarios[0].confirmado)
				return "E-mail já confirmado";

			if (!tokenreset || !usuarios[0].tokenreset || usuarios[0].tokenreset !== tokenreset)
				return "Código de confirmação inválido";

			await sql.query("update usuario set confirmado = 1, tokenreset = null where id = ?", [id]);

			return null;
		});
	}

	public static async editar(usuario: Usuario): Promise<string> {
		let res: string;
		if ((res = Usuario.validar(usuario, false)))
			return res;

		if (usuario.id === Usuario.IdAdmin)
			return "Não é possível editar o usuário administrador principal";

		return await app.sql.connect(async (sql) => {
			await sql.query("update usuario set nome = ?, idperfil = ? where id = ?", [usuario.nome, usuario.idperfil, usuario.id]);

			return (sql.affectedRows ? null : "Usuário não encontrado");
		});
	}

	public static async excluir(id: number): Promise<string> {
		if (id === Usuario.IdAdmin)
			return "Não é possível excluir o usuário administrador principal";

		return app.sql.connect(async (sql) => {
			const agora = DataUtil.horarioDeBrasiliaISOComHorario();

			// Utilizar substr(email, instr(email, ':') + 1) para remover o prefixo, caso precise desfazer a exclusão (caso
			// não exista o prefixo, instr() vai retornar 0, que, com o + 1, faz o substr() retornar a própria string inteira)
			await sql.query("update usuario set email = concat('@', id, ':', email), token = null, exclusao = ? where id = ?", [agora, id]);

			return (sql.affectedRows ? null : "Usuário não encontrado");
		});
	}

	public static async redefinirSenhaExterno(email: string): Promise<string | null> {
		if (!email || !(email = email.normalize().trim()))
			return "E-mail inválido";

		return app.sql.connect(async (sql) => {
			const usuarios: { id: number, nome: string, confirmado: number }[] = await sql.query("select id, nome, confirmado from usuario where email = ?", [email]);

			if (!usuarios || !usuarios.length)
				return "Usuário não encontrado";

			if (!usuarios[0].confirmado)
				return "Por favor, siga as instruções enviadas para o e-mail " + email + " para confirmar seu pedido de cadastro";

			const tokenreset = randomBytes(32).toString("hex"),
				id = "0000000" + (usuarios[0].id ^ appsettings.usuarioHashId).toString(16),
				buffer = Buffer.from(id.substr(id.length - 8) + tokenreset, "utf-8");

			for (let i = buffer.length - 1; i >= 0; i--)
				buffer[i] ^= 0x55;

			const agora = new Date(),
				limite = new Date(agora.getTime() + (2 * 24 * 60 * 60 * 1000));

			await sql.query("update usuario set tokenreset = ?, datalimitereset = ? where id = ?", [tokenreset, limite.getTime().toString(), usuarios[0].id]);

			const link = appsettings.urlSite + app.root + "/redefinirSenha?" + SafeBase64.encode(buffer),
				html = `
					<p>Olá, ${usuarios[0].nome}!</p>
					<p>Recebemos um pedido para redefinir sua senha em ${agora.toLocaleString("pt-BR")}.</p>
					<p>Por favor, acesse o link <a target="_blank" href="${link}">${link}</a> até ${limite.toLocaleString("pt-BR")} para redefinir sua senha.</p>
				`;

			await Email.enviar({
				from: appsettings.mailFromGeral,
				to: email,
				subject: "terra 2030 - Redefinição de senha",
				html: html
			});

			return null;
		});
	}

	public static async redefinirSenhaToken(safeBase64Token: string, novaSenha: string): Promise<string | null> {
		if (!safeBase64Token)
			return "Informações de redefinição de senha inválidas";

		if ((novaSenha = novaSenha.normalize()).length < 6 || novaSenha.length > 20)
			return "Nova senha inválida";

		let id: number, tokenreset: string;

		try {
			const buffer = SafeBase64.decode(safeBase64Token);
			for (let i = buffer.length - 1; i >= 0; i--)
				buffer[i] ^= 0x55;

			const idTokenreset = buffer.toString("utf-8");
			if (idTokenreset.length < 32)
				return "Informações de redefinição de senha inválidas";

			id = parseInt(idTokenreset.substr(0, 8), 16);
			if (isNaN(id))
				return "Informações de redefinição de senha inválidas";

			id ^= appsettings.usuarioHashId;
			tokenreset = idTokenreset.substr(8);
		} catch (ex: any) {
			return "Informações de redefinição de senha inválidas";
		}

		return app.sql.connect(async (sql) => {
			const usuarios: { id: number, email: string, confirmado: number, tokenreset: string, datalimitereset: string }[] = await sql.query("select id, email, confirmado, tokenreset, datalimitereset from usuario where id = ? and exclusao is null", [id]);

			if (!usuarios || !usuarios.length)
				return "Usuário não encontrado";

			if (!usuarios[0].confirmado)
				return "Por favor, siga as instruções enviadas para o e-mail " + usuarios[0].email + " para confirmar a criação de sua conta";
	
			const datalimitereset = parseInt(usuarios[0].datalimitereset);

			if (!tokenreset || !usuarios[0].tokenreset || usuarios[0].tokenreset !== tokenreset || isNaN(datalimitereset))
				return "Código de redefinição inválido";

			if ((new Date()).getTime() > datalimitereset)
				return "Código de redefinição expirado";

			const hash = await GeradorHash.criarHash(novaSenha);

			await sql.query("update usuario set senha = ?, token = null, tokenreset = null, datalimitereset = null where id = ?", [hash, id]);

			return null;
		});
	}
}

export = Usuario;
