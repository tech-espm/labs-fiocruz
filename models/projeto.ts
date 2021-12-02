import app = require("teem");
import { randomBytes } from "crypto";
import appsettings = require("../appsettings");
import Abrangencia = require("../enums/abrangencia");
import abrangencias = require("./abrangencia");
import bancosTecnologia = require("./bancoTecnologia");
import BancoTecnologia = require("../enums/bancoTecnologia");
import Caracteristica = require("../enums/caracteristica");
import caracteristicas = require("./caracteristica");
import DataUtil = require("../utils/dataUtil");
import Divulgacao = require("../enums/divulgacao");
import divulgacoes = require("./divulgacao");
import Email = require("../utils/email");
import GeradorHash = require("../utils/geradorHash");
import intToHex = require("../utils/intToHex");
import MacroCategoria = require("../enums/macroCategoria");
import macroCategorias = require("./macroCategoria");
import ODS = require("../enums/ods");
import ods = require("./ods");
import Perfil = require("../enums/perfil");
import SafeBase64 = require("../utils/safeBase64");
import Status = require("../enums/status");
import status = require("./status");
import Validacao = require("../utils/validacao");

interface Projeto {
	id: number;
	idusuario: number;
	aprovado: number;
	banco: BancoTecnologia;
	resumoods: string;
	autor: string;
	telefone: string;
	email: string;
	idestado: number;
	idcidade: number;
	logradouro: string;
	numero: string;
	complemento: string;
	bairro: string;
	cep: string;
	latitude: number;
	longitude: number;
	nome: string;
	exposicao: number;
	versaoimagem: number;
	info: string;
	criacao: string;

	ods?: ODS[];

	arquivoIcone?: string | null;
	arquivoImagem?: string | null;
}

interface ProjetoInfo {
	publico: string;
	descricao: string;
	macrocategoria: MacroCategoria[];
	escalonamento: string;
	local: string;
	abrangencia: Abrangencia;
	parceiros: string;
	status: Status;
	financiamento: string;
	replicabilidade: string;
	divulgacao: Divulgacao[];
	links: string[];
	caracteristica: Caracteristica[];
}

class Projeto {
	public static readonly PrefixoAbsolutoIcone = "/img/i";
	public static readonly CaminhoRelativoIcone = "public/img/i/";

	public static readonly PrefixoAbsolutoImagem = "/img/p";
	public static readonly CaminhoRelativoImagem = "public/img/p/";

	public static readonly TamanhoMaximoIconeEmKiB = 64;
	public static readonly TamanhoMaximoIconeEmBytes = Projeto.TamanhoMaximoIconeEmKiB << 10;

	public static readonly TamanhoMaximoImagemEmKiB = 640;
	public static readonly TamanhoMaximoImagemEmBytes = Projeto.TamanhoMaximoImagemEmKiB << 10;

	private static validar(projeto: Projeto, criacao: boolean): string | null {
		if (!projeto)
			return "Projeto inválido";

		projeto.id = parseInt(projeto.id as any);

		if (!criacao) {
			if (isNaN(projeto.id))
				return "Id inválido";
		}

		if (isNaN(projeto.idusuario = parseInt(projeto.idusuario as any)))
			return "Usuário inválido";

		// Deixar como == mesmo!
		projeto.aprovado = ((projeto.aprovado == 1) ? 1 : 0);

		if (isNaN(projeto.banco = parseInt(projeto.banco as any)) || projeto.banco < 1 || projeto.banco > bancosTecnologia.lista.length)
			return "Banco de tecnologia inválido";

		if (!projeto.autor || !(projeto.autor = projeto.autor.normalize().trim()) || projeto.autor.length > 100)
			return "Autor inválido";

		if (!projeto.telefone || !(projeto.telefone = projeto.telefone.normalize().trim()) || projeto.telefone.length < 14 || projeto.telefone.length > 15)
			return "Telefone inválido";

		if (!projeto.email || !Validacao.isEmail(projeto.email = projeto.email.normalize().trim().toLowerCase()) || projeto.email.length > 100)
			return "E-mail inválido";

		if (isNaN(projeto.idestado = parseInt(projeto.idestado as any)))
			return "UF inválida";

		if (isNaN(projeto.idcidade = parseInt(projeto.idcidade as any)))
			return "Cidade inválida";

		if (!projeto.logradouro || !(projeto.logradouro = projeto.logradouro.normalize().trim()) || projeto.logradouro.length > 100)
			return "Endereço inválido";

		if (!projeto.numero || !(projeto.numero = projeto.numero.normalize().trim()) || projeto.numero.length > 20)
			return "Número inválido";

		projeto.complemento = (projeto.complemento || "").normalize().trim();
		if (projeto.complemento.length > 50)
			return "Complemento inválido";

		if (!projeto.bairro || !(projeto.bairro = projeto.bairro.normalize().trim()) || projeto.bairro.length > 100)
			return "Número inválido";

		if (!projeto.cep || !(projeto.cep = projeto.cep.normalize().trim()) || projeto.cep.length > 9)
			return "CEP inválido";

		projeto.latitude = (parseFloat(projeto.latitude as any) || 0);
		projeto.longitude = (parseFloat(projeto.longitude as any) || 0);

		if (!projeto.latitude || !projeto.longitude) {
			projeto.latitude = 0;
			projeto.longitude = 0;
		}

		if (!projeto.nome || !(projeto.nome = projeto.nome.normalize().trim()) || projeto.nome.length > 100)
			return "Nome inválido";

		// Deixar como == mesmo!
		projeto.exposicao = ((projeto.exposicao == 1) ? 1 : 0);

		if (projeto.ods) {
			if (!Array.isArray(projeto.ods) && projeto.ods !== undefined)
				projeto.ods = [projeto.ods as any];

			for (let i = projeto.ods.length - 1; i >= 0; i--) {
				if (isNaN(projeto.ods[i] = parseInt(projeto.ods[i] as any)) || projeto.ods[i] < 1 || projeto.ods[i] > ods.lista.length)
					return "ODS inválida";
			}

			if (!projeto.ods.length)
				return "Por favor, selecione pelo menos uma ODS";

			projeto.ods.sort((a, b) => (a - b));

			for (let i = projeto.ods.length - 2; i >= 0; i--) {
				if (projeto.ods[i] === projeto.ods[i + 1])
					return "ODS repetida";
			}

			projeto.resumoods = projeto.ods.join(",");
		} else {
			return "Por favor, selecione pelo menos uma ODS";
		}

		// Esses dados vêm juntos da tela, mas são gravados como JSON no campo projeto.info
		const info: ProjetoInfo = projeto as any,
			tmp: ProjetoInfo = {} as any;

		// Vai construindo o objeto final (tmp) conforme valida, em vez de receber um JSON
		// da tela, para evitar que alguém envie um JSON malicioso!

		tmp.publico = (info.publico || "").normalize().trim();
		if (tmp.publico.length > 100)
			return "Público-alvo inválido";

		if (!info.descricao || !(tmp.descricao = info.descricao.normalize().trim()) || tmp.descricao.length > 500)
			return "Descrição inválida";

		if (!Array.isArray(info.macrocategoria) && info.macrocategoria !== undefined)
			info.macrocategoria = [info.macrocategoria as any];

		tmp.macrocategoria = info.macrocategoria;
		if (!tmp.macrocategoria || !tmp.macrocategoria.length)
			return "Por favor, selecione pelo menos uma macro categoria";

		if (tmp.macrocategoria.length > macroCategorias.lista.length)
			return "Macro categorias inválidas";

		for (let i = tmp.macrocategoria.length - 1; i >= 0; i--) {
			if (isNaN(tmp.macrocategoria[i] = parseInt(tmp.macrocategoria[i] as any)) || tmp.macrocategoria[i] < 1 || tmp.macrocategoria[i] > macroCategorias.lista.length)
				return "Macro categoria inválida";
		}

		tmp.macrocategoria.sort((a, b) => (a - b));

		for (let i = tmp.macrocategoria.length - 2; i >= 0; i--) {
			if (tmp.macrocategoria[i] === tmp.macrocategoria[i + 1])
				return "Macro categoria repetida";
		}

		tmp.escalonamento = (info.escalonamento || "").normalize().trim();
		if (tmp.escalonamento.length > 100)
			return "Escalonamento inválido";

		if (!info.local || !(tmp.local = info.local.normalize().trim()) || tmp.local.length > 100)
			return "Local de implementação inválido";

		if (isNaN(tmp.abrangencia = parseInt(info.abrangencia as any)) || tmp.abrangencia < 1 || tmp.abrangencia > abrangencias.lista.length)
			return "Abrangência inválida";

		tmp.parceiros = (info.parceiros || "").normalize().trim();
		if (tmp.parceiros.length > 100)
			return "Parceiros inválido";

		if (isNaN(tmp.status = parseInt(info.status as any)) || tmp.status < 1 || tmp.status > status.lista.length)
			return "Status inválido";

		tmp.financiamento = (info.financiamento || "").normalize().trim();
		if (tmp.financiamento.length > 100)
			return "Financiamento inválido";

		tmp.replicabilidade = (info.replicabilidade || "").normalize().trim();
		if (tmp.replicabilidade.length > 100)
			return "Replicabilidade inválida";

		if (!Array.isArray(info.divulgacao) && info.divulgacao !== undefined)
			info.divulgacao = [info.divulgacao as any];

		tmp.divulgacao = info.divulgacao;
		if (!tmp.divulgacao || !tmp.divulgacao.length)
			tmp.divulgacao = [];

		if (tmp.divulgacao.length > divulgacoes.lista.length)
			return "Divulgações inválidas";

		for (let i = tmp.divulgacao.length - 1; i >= 0; i--) {
			if (isNaN(tmp.divulgacao[i] = parseInt(tmp.divulgacao[i] as any)) || tmp.divulgacao[i] < 1 || tmp.divulgacao[i] > divulgacoes.lista.length)
				return "Divulgação inválida";
		}

		tmp.divulgacao.sort((a, b) => (a - b));

		for (let i = tmp.divulgacao.length - 2; i >= 0; i--) {
			if (tmp.divulgacao[i] === tmp.divulgacao[i + 1])
				return "Divulgação repetida";
		}

		if (!Array.isArray(info.links) && info.links !== undefined)
			info.links = [info.links as any];

		tmp.links = info.links;
		if (!tmp.links || !tmp.links.length)
			tmp.links = [];

		if (tmp.links.length > 5)
			return "Links inválidos";

		for (let i = tmp.links.length - 1; i >= 0; i--) {
			if (!tmp.links[i] || !(tmp.links[i] = tmp.links[i].normalize().trim()) || tmp.links[i].length > 100 || !tmp.links[i].toLowerCase().startsWith("http"))
				return "Link inválido";
		}

		if (!Array.isArray(info.caracteristica) && info.caracteristica !== undefined)
			info.caracteristica = [info.caracteristica as any];

		tmp.caracteristica = info.caracteristica;
		if (!tmp.caracteristica || !tmp.caracteristica.length)
			tmp.caracteristica = [];

		if (tmp.caracteristica.length > caracteristicas.lista.length)
			return "Características inválidas";

		for (let i = tmp.caracteristica.length - 1; i >= 0; i--) {
			if (isNaN(tmp.caracteristica[i] = parseInt(tmp.caracteristica[i] as any)) || tmp.caracteristica[i] < 1 || tmp.caracteristica[i] > caracteristicas.lista.length)
				return "Característica inválida";
		}

		tmp.caracteristica.sort((a, b) => (a - b));

		for (let i = tmp.caracteristica.length - 2; i >= 0; i--) {
			if (tmp.caracteristica[i] === tmp.caracteristica[i + 1])
				return "Característica repetida";
		}

		projeto.info = JSON.stringify(tmp);

		if (projeto.info.length > 64000)
			return "O tamanho das informações extras do projeto excede o limite de 64000 bytes";

		return null;
	}

	private static validarImagem(arquivo: string | undefined | null, buffer: Buffer[], tamanhoMaximoBytes: number): string | null {
		if (arquivo && arquivo.length) {
			if (!arquivo.startsWith("data:image/jpeg;base64,") || arquivo.length === 23)
				return "A foto do projeto deve ser um arquivo JPEG propriamente codificado";

			if (arquivo.length > (23 + (tamanhoMaximoBytes * 4 / 3)))
				return `A foto do projeto deve ter até ${tamanhoMaximoBytes} bytes`;

			buffer.push(Buffer.from(arquivo.substr(23), "base64"));
		}

		return null;
	}

	private static async tentarOperacao<T>(operacao: () => Promise<T>, vezes: number): Promise<T> {
		try {
			return await operacao();
		} catch (ex: any) {
			vezes--;
			if (vezes <= 0)
				throw ex;

			return new Promise((resolve, reject) => {
				setTimeout(() => {
					Projeto.tentarOperacao(operacao, vezes).then(resolve, reject);
				}, 100);
			});
		}
	}

	public static async listarExterno(): Promise<Projeto[]> {
		let lista: Projeto[] | null = null;

		await app.sql.connect(async (sql) => {
			lista = await sql.query("select p.id, p.resumoods, e.nome estado, c.nome cidade, p.latitude, p.longitude, p.nome, p.exposicao, p.versaoimagem, date_format(p.criacao, '%d/%m/%Y') criacao from projeto p inner join estado e on e.id = p.idestado inner join cidade c on c.id = p.idcidade where p.aprovado = 1 and p.exclusao is null order by p.id desc") as Projeto[];
		});

		return (lista || []);
	}

	public static async listar(idusuario: number, admin: boolean, apenasNaoAprovados?: boolean): Promise<Projeto[]> {
		let lista: Projeto[] | null = null;

		await app.sql.connect(async (sql) => {
			const params = [];
			if (!admin)
				params.push(idusuario);

			lista = await sql.query("select " + (admin ? "p.idusuario, u.email usuario, " : "") + "p.id, p.aprovado, p.resumoods, p.autor, p.telefone, p.email, e.nome estado, c.nome cidade, p.latitude, p.longitude, p.nome, p.exposicao, p.versaoimagem, date_format(p.criacao, '%d/%m/%Y') criacao from projeto p inner join estado e on e.id = p.idestado inner join cidade c on c.id = p.idcidade " + (admin ? "inner join usuario u on u.id = p.idusuario " : "") + "where p.exclusao is null" + (admin ? "" : " and p.idusuario = ?") + (apenasNaoAprovados ? " and p.aprovado = 0" : ""), params) as Projeto[];
		});

		return (lista || []);
	}

	public static async obter(id: number, idusuario: number, admin: boolean): Promise<Projeto | null> {
		let lista: Projeto[] | null = null;

		await app.sql.connect(async (sql) => {
			const params = [id];
			if (!admin)
				params.push(idusuario);

			lista = await sql.query("select id, idusuario, aprovado, banco, resumoods, autor, telefone, email, idestado, idcidade, logradouro, numero, complemento, bairro, cep, latitude, longitude, nome, exposicao, versaoimagem, info from projeto where id = ? and exclusao is null" + (admin ? "" : " and idusuario = ?"), params) as Projeto[];
		});

		return ((lista && lista[0]) || null);
	}

	public static async criar(projeto: Projeto, idusuario: number, admin: boolean): Promise<string | null> {
		projeto.idusuario = idusuario;
		projeto.versaoimagem = 1;

		if (!admin)
			projeto.aprovado = 0;

		const buffers: Buffer[] = [];

		let res: string | null;
		if ((res = (Projeto.validar(projeto, true) ||
			Projeto.validarImagem(projeto.arquivoIcone, buffers, Projeto.TamanhoMaximoIconeEmBytes) ||
			Projeto.validarImagem(projeto.arquivoImagem, buffers, Projeto.TamanhoMaximoImagemEmBytes))))
			return res;

		await app.sql.connect(async (sql) => {
			let excluirIcone = false;

			try {
				const agora = DataUtil.horarioDeBrasiliaISOComHorario();

				await sql.beginTransaction();

				await sql.query("insert into projeto (idusuario, aprovado, banco, resumoods, autor, telefone, email, idestado, idcidade, logradouro, numero, complemento, bairro, cep, latitude, longitude, nome, exposicao, versaoimagem, info, criacao) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [projeto.idusuario, projeto.aprovado, projeto.banco, projeto.resumoods, projeto.autor, projeto.telefone, projeto.email, projeto.idestado, projeto.idcidade, projeto.logradouro, projeto.numero, projeto.complemento, projeto.bairro, projeto.cep, projeto.latitude, projeto.longitude, projeto.nome, projeto.exposicao, projeto.versaoimagem, projeto.info, agora]);

				projeto.id = await sql.scalar("select last_insert_id()") as number;

				// Apenas para caso o filtro por ODS venha para o back-end
				if (projeto.ods && projeto.ods.length) {
					const params = [projeto.id, 0];
					for (let i = 0; i < projeto.ods.length; i++) {
						params[1] = projeto.ods[i];
						await sql.query("insert into projetoods (idprojeto, idods) values (?, ?)", params);
					}
				}

				await Projeto.tentarOperacao(() => app.fileSystem.saveBufferToNewFile(Projeto.CaminhoRelativoIcone + projeto.id + ".jpg", buffers[0]), 3);

				excluirIcone = true;

				await Projeto.tentarOperacao(() => app.fileSystem.saveBufferToNewFile(Projeto.CaminhoRelativoImagem + projeto.id + ".jpg", buffers[1]), 3);

				await sql.commit();
			} catch (ex: any) {
				if (excluirIcone) {
					try {
						await Projeto.tentarOperacao(() => app.fileSystem.deleteFile(Projeto.CaminhoRelativoIcone + projeto.id + ".jpg"), 3);
					} catch (ex: any) {
						// Apenas ignora...
					}
				}

				if (ex.code) {
					switch (ex.code) {
						case "ER_NO_REFERENCED_ROW":
						case "ER_NO_REFERENCED_ROW_2":
							res = "Usuário, UF, cidade ou ODS não encontrada";
							break;
						default:
							throw ex;
					}
				} else {
					throw ex;
				}
			}
		});

		return res;
	}

	public static async editar(projeto: Projeto, idusuario: number, admin: boolean): Promise<string | null> {
		if (!admin) {
			// Ao ser editado, o projeto volta para o status de não aprovado
			projeto.idusuario = idusuario;
			projeto.aprovado = 0;
		}

		let res: string | null;
		if ((res = Projeto.validar(projeto, false)))
			return res;

		const buffers: Buffer[] = [];

		if (projeto.arquivoIcone || projeto.arquivoImagem) {
			if ((res = (Projeto.validarImagem(projeto.arquivoIcone, buffers, Projeto.TamanhoMaximoIconeEmBytes) ||
				Projeto.validarImagem(projeto.arquivoImagem, buffers, Projeto.TamanhoMaximoImagemEmBytes))))
				return res;
		}

		return await app.sql.connect(async (sql) => {
			try {
				await sql.beginTransaction();

				let params = [projeto.aprovado, projeto.banco, projeto.resumoods, projeto.autor, projeto.telefone, projeto.email, projeto.idestado, projeto.idcidade, projeto.logradouro, projeto.numero, projeto.complemento, projeto.bairro, projeto.cep, projeto.latitude, projeto.longitude, projeto.nome, projeto.exposicao, projeto.info, projeto.id];

				if (!admin)
					params.push(idusuario);

				await sql.query("update projeto set aprovado = ?, banco = ?, resumoods = ?, autor = ?, telefone = ?, email = ?, idestado = ?, idcidade = ?, logradouro = ?, numero = ?, complemento = ?, bairro = ?, cep = ?, latitude = ?, longitude = ?, nome = ?, exposicao = ?" + (buffers.length ? ", versaoimagem = versaoimagem + 1" : "") + ", info = ? where id = ? and exclusao is null" + (admin ? "" : " and idusuario = ?"), params);

				if (!sql.affectedRows)
					return "Projeto não encontrado";

				const existentes: { id: number, idods: number }[] = await sql.query("select id, idods from projetoods where idprojeto = ?", [projeto.id]);

				// Apenas para caso o filtro por ODS venha para o back-end

				if (projeto.ods && projeto.ods.length) {
					const novas = projeto.ods;

					for (let i = novas.length - 1; i >= 0; i--) {
						const nova = novas[i];
						for (let j = existentes.length - 1; j >= 0; j--) {
							const existente = existentes[j];
							if (existente.idods === nova) {
								novas.splice(i, 1);
								existentes.splice(j, 1);
								break;
							}
						}
					}

					params = [projeto.id, 0];
					for (let i = novas.length - 1; i >= 0; i--) {
						params[1] = novas[i];
						await sql.query("insert into projetoods (idprojeto, idods) values (?, ?)", params);
					}
				}

				for (let i = existentes.length - 1; i >= 0; i--)
					await sql.query("delete from projetoods where id = ?", [existentes[i].id]);

				if (buffers.length)
					await Promise.all([
						Projeto.tentarOperacao(() => app.fileSystem.saveBuffer(Projeto.CaminhoRelativoIcone + projeto.id + ".jpg", buffers[0]), 3),
						Projeto.tentarOperacao(() => app.fileSystem.saveBuffer(Projeto.CaminhoRelativoImagem + projeto.id + ".jpg", buffers[1]), 3)
					]);

				await sql.commit();
			} catch (ex: any) {
				if (ex.code) {
					switch (ex.code) {
						case "ER_NO_REFERENCED_ROW":
						case "ER_NO_REFERENCED_ROW_2":
							res = "Usuário, UF ou cidade não encontrada";
							break;
						default:
							throw ex;
					}
				} else {
					throw ex;
				}
			}

			return null;
		});
	}

	public static async aprovar(id: number): Promise<string | null> {
		return await app.sql.connect(async (sql) => {
			await sql.query("update projeto set aprovado = 1 where id = ? and exclusao is null", [id]);

			return (sql.affectedRows ? null : "Projeto não encontrado");
		});
	}

	public static async excluir(id: number, idusuario: number, admin: boolean): Promise<string | null> {
		return app.sql.connect(async (sql) => {
			const agora = DataUtil.horarioDeBrasiliaISOComHorario();

			const params = [agora, id];

			if (!admin)
				params.push(idusuario);

			await sql.query("update projeto set exclusao = ? where id = ? and exclusao is null" + (admin ? "" : " and idusuario = ?"), params);

			if (sql.affectedRows) {
				try {
					await Projeto.tentarOperacao(() => app.fileSystem.deleteFile(Projeto.CaminhoRelativoIcone + id + ".jpg"), 3);
				} catch (ex: any) {
					// Apenas ignora...
				}

				try {
					await Projeto.tentarOperacao(() => app.fileSystem.deleteFile(Projeto.CaminhoRelativoImagem + id + ".jpg"), 3);
				} catch (ex: any) {
					// Apenas ignora...
				}

				return null;
			}

			return "Projeto não encontrado";
		});
	}
}

export = Projeto;
