import app = require("teem");
import { randomBytes } from "crypto";
import appsettings = require("../appsettings");
import DataUtil = require("../utils/dataUtil");
import divulgacoes = require("./divulgacao");
import Email = require("../utils/email");
import GeradorHash = require("../utils/geradorHash");
import intToHex = require("../utils/intToHex");
import macroCategorias = require("./macroCategoria");
import ods = require("./ods");
import Perfil = require("../enums/perfil");
import SafeBase64 = require("../utils/safeBase64");
import Validacao = require("../utils/validacao");

interface Projeto {
	id: number;
	idusuario: number;
	aprovado: number;
	banco: number;
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
	versaoimagem: number;
	info: string;
	criacao: string;

	ods?: number[];
}

interface ProjetoInfo {
	publico: string;
	descricao: string;
	macrocategoria: number[];
	escalonamento: string;
	local: string;
	abrangencia: number;
	parceiros: string;
	status: number;
	financiamento: string;
	replicabilidade: string;
	divulgacao: number[];
	links: string[];
	abordapobreza: number;
	abordadireitos: number;
	abordagenero: number;
	consultapublica: number;
	inovadora: number;
	sustentavel: number;
	indigena: number;
	populacaolocal: number;
	resolucaoconflitos: number;
	metodologia: number;
	trocainformacoes: number;
	agentes: number;
	exposicao: number;
}

class Projeto {
	private static validar(projeto: Projeto, criacao: boolean): string {
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

		if (isNaN(projeto.banco = parseInt(projeto.banco as any)))
			return "Banco inválido";

		if (!projeto.autor || !(projeto.autor = projeto.autor.normalize().trim()) || projeto.autor.length > 100)
			return "Autor inválido";

		if (!projeto.telefone || !(projeto.telefone = projeto.telefone.normalize().trim()) || projeto.telefone.length < 14 || projeto.telefone.length > 15)
			return "Telefone inválido";

		if (!projeto.email || !Validacao.isEmail(projeto.email = projeto.email.normalize().trim().toLowerCase()) || projeto.email.length > 100)
			return "E-mail inválido";

		if (isNaN(projeto.idestado = parseInt(projeto.idestado as any)))
			return "Estado inválido";

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

		if (!projeto.nome || !(projeto.nome = projeto.autor.normalize().trim()) || projeto.nome.length > 100)
			return "Nome inválido";

		if (projeto.ods) {
			if (!Array.isArray(projeto.ods))
				projeto.ods = [projeto.ods as any];

			for (let i = projeto.ods.length - 1; i >= 0; i--) {
				if (isNaN(projeto.ods[i] = parseInt(projeto.ods[i] as any)) || projeto.ods[i] < 1 || projeto.ods[i] > ods.lista.length)
					return "ODS inválida";
			}
		}

		// Esses dados vêm juntos da tela, mas são gravados como JSON no campo projeto.info
		const info: ProjetoInfo = projeto as any,
			tmp: ProjetoInfo = {} as any;

		// Vai construindo o objeto final (tmp) conforme valida, em vez de receber um JSON
		// da tela, para evitar que alguém envie um JSON malicioso!

		tmp.publico = (info.publico || "").normalize().trim();
		if (tmp.publico.length > 100)
			return "Complemento inválido";

		if (!info.descricao || !(tmp.descricao = info.descricao.normalize().trim()) || tmp.descricao.length > 100)
			return "Autor inválido";

		if (!Array.isArray(info.macrocategoria))
			info.macrocategoria = [info.macrocategoria as any];

		tmp.macrocategoria = info.macrocategoria;
		if (!tmp.macrocategoria || !tmp.macrocategoria.length || tmp.macrocategoria.length > macroCategorias.lista.length)
			return "Macro categorias inválidas";

		for (let i = tmp.macrocategoria.length - 1; i >= 0; i--) {
			if (isNaN(tmp.macrocategoria[i] = parseInt(tmp.macrocategoria[i] as any)) || tmp.macrocategoria[i] < 1 || tmp.macrocategoria[i] > macroCategorias.lista.length)
				return "Macro categoria inválida";
		}

		tmp.escalonamento = (info.escalonamento || "").normalize().trim();
		if (tmp.escalonamento.length > 100)
			return "Escalonamento inválido";

		if (!info.local || !(tmp.local = info.local.normalize().trim()) || tmp.local.length > 100)
			return "Local inválido";

		if (isNaN(tmp.abrangencia = parseInt(info.abrangencia as any)))
			return "Abrangência inválida";

		tmp.parceiros = (info.parceiros || "").normalize().trim();
		if (tmp.parceiros.length > 100)
			return "Parceiros inválido";

		if (isNaN(tmp.status = parseInt(info.status as any)))
			return "Status inválido";

		tmp.financiamento = (info.financiamento || "").normalize().trim();
		if (tmp.financiamento.length > 100)
			return "Financiamento inválido";

		tmp.replicabilidade = (info.replicabilidade || "").normalize().trim();
		if (tmp.replicabilidade.length > 100)
			return "Replicabilidade inválida";

		if (!Array.isArray(info.divulgacao))
			info.divulgacao = [info.divulgacao as any];

		tmp.divulgacao = info.divulgacao;
		if (!tmp.divulgacao || !tmp.divulgacao.length || tmp.divulgacao.length > divulgacoes.lista.length)
			return "Divulgações inválidas";

		for (let i = tmp.divulgacao.length - 1; i >= 0; i--) {
			if (isNaN(tmp.divulgacao[i] = parseInt(tmp.divulgacao[i] as any)) || tmp.divulgacao[i] < 1 || tmp.divulgacao[i] > divulgacoes.lista.length)
				return "Divulgação inválida";
		}

		if (!Array.isArray(info.links))
			info.links = [info.links as any];

		tmp.links = info.links;
		if (!tmp.links || !tmp.links.length || tmp.links.length > 5)
			return "Links inválidos";

		for (let i = tmp.links.length - 1; i >= 0; i--) {
			if (!tmp.links[i] || !(tmp.links[i] = tmp.links[i].normalize().trim()) || tmp.links[i].length > 100 || !tmp.links[i].toLowerCase().startsWith("http"))
				return "Link inválido";
		}

		// Deixar como == mesmo!
		tmp.abordapobreza = ((info.abordapobreza == 1) ? 1 : 0);
		tmp.abordadireitos = ((info.abordadireitos == 1) ? 1 : 0);
		tmp.abordagenero = ((info.abordagenero == 1) ? 1 : 0);
		tmp.consultapublica = ((info.consultapublica == 1) ? 1 : 0);
		tmp.inovadora = ((info.inovadora == 1) ? 1 : 0);
		tmp.sustentavel = ((info.sustentavel == 1) ? 1 : 0);
		tmp.indigena = ((info.indigena == 1) ? 1 : 0);
		tmp.populacaolocal = ((info.populacaolocal == 1) ? 1 : 0);
		tmp.resolucaoconflitos = ((info.resolucaoconflitos == 1) ? 1 : 0);
		tmp.metodologia = ((info.metodologia == 1) ? 1 : 0);
		tmp.trocainformacoes = ((info.trocainformacoes == 1) ? 1 : 0);
		tmp.agentes = ((info.agentes == 1) ? 1 : 0);
		tmp.exposicao = ((info.exposicao == 1) ? 1 : 0);

		projeto.info = JSON.stringify(tmp);

		return null;
	}

	public static async listar(idusuario: number, admin: boolean): Promise<Projeto[]> {
		let lista: Projeto[] = null;

		await app.sql.connect(async (sql) => {
			const params = [];
			if (!admin)
				params.push(idusuario);

			lista = await sql.query("select @@@ from projeto where exclusao is null" + (admin ? "" : " and idusuario = ?"), params) as Projeto[];
		});

		return (lista || []);
	}

	public static async obter(id: number, idusuario: number, admin: boolean): Promise<Projeto> {
		let lista: Projeto[] = null;

		await app.sql.connect(async (sql) => {
			const params = [id];
			if (!admin)
				params.push(idusuario);

			lista = await sql.query("select @@@ from projeto where id = ? and exclusao is null" + (admin ? "" : " and idusuario = ?"), params) as Projeto[];
		});

		return ((lista && lista[0]) || null);
	}

	public static async criar(projeto: Projeto, idusuario: number, admin: boolean): Promise<string> {
		projeto.idusuario = idusuario;

		if (!admin)
			projeto.aprovado = 0;

		let res: string;
		if ((res = Projeto.validar(projeto, true)))
			return res;

		await app.sql.connect(async (sql) => {
			try {
				const agora = DataUtil.horarioDeBrasiliaISOComHorario();

				await sql.beginTransaction();

				await sql.query("insert into projeto (@@@) values (@@@)", []);

				projeto.id = await sql.scalar("select last_insert_id()");

				await sql.commit();
			} catch (e) {
				if (e.code) {
					switch (e.code) {
						case "ER_NO_REFERENCED_ROW":
						case "ER_NO_REFERENCED_ROW_2":
							res = "Usuário, Estado ou cidade não encontrada";
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

	public static async editar(projeto: Projeto, idusuario: number, admin: boolean): Promise<string> {
		if (!admin) {
			// Ao ser editado, o projeto volta para o status de não aprovado
			projeto.idusuario = idusuario;
			projeto.aprovado = 0;
		}

		let res: string;
		if ((res = Projeto.validar(projeto, false)))
			return res;

		return await app.sql.connect(async (sql) => {
			try {
				await sql.beginTransaction();

				const params = [projeto.id];

				if (!admin)
					params.push(idusuario);
	
				await sql.query("update projeto set @@@ where id = ? and exclusao is null" + (admin ? "" : " and idusuario = ?"), params);

				await sql.commit();
			} catch (e) {
				if (e.code) {
					switch (e.code) {
						case "ER_NO_REFERENCED_ROW":
						case "ER_NO_REFERENCED_ROW_2":
							res = "Usuário, Estado ou cidade não encontrada";
							break;
						default:
							throw e;
					}
				} else {
					throw e;
				}
			}

			return (sql.affectedRows ? null : "Projeto não encontrado");
		});
	}

	public static async aprovar(id: number): Promise<string> {
		return await app.sql.connect(async (sql) => {
			await sql.query("update projeto set aprovado = 1 where id = ? and exclusao is null", [id]);

			return (sql.affectedRows ? null : "Projeto não encontrado");
		});
	}

	public static async excluir(id: number): Promise<string> {
		return app.sql.connect(async (sql) => {
			const agora = DataUtil.horarioDeBrasiliaISOComHorario();

			await sql.query("update projeto set exclusao = ? where id = ? and exclusao is null", [agora, id]);

			return (sql.affectedRows ? null : "Projeto não encontrado");
		});
	}
}

export = Projeto;
