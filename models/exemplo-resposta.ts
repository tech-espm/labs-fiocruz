import app = require("teem");

export = class Resposta {
	public id: number;
	public idpessoa: number;
	public idassunto: number;
	public texto: string;
	public criacao: string;

	private static validar(resposta: Resposta): string {
		if (!resposta)
			return "Dados inválidos";

		if (isNaN(resposta.idpessoa) || resposta.idpessoa <= 0)
			return "Pessoa inválida";

		if (isNaN(resposta.idassunto) || resposta.idassunto <= 0)
			return "Assunto inválido";

		resposta.texto = (resposta.texto || "").normalize().trim();
		if (resposta.texto.length < 3 || resposta.texto.length > 10000)
			return "Texto inválido";

		return null;
	}

	public static async listar(sql: app.Sql, idpessoa: number): Promise<Resposta[]> {
		const lista = (await sql.query("select resposta.id, resposta.idpessoa, resposta.idassunto, resposta.texto, date_format(resposta.criacao, '%d/%m/%Y') criacao from resposta resposta inner join assunto a on a.id = resposta.idassunto where resposta.idpessoa = ? order by a.nome asc", [idpessoa])) as Resposta[];

		return lista || [];
	}

	public static async criar(sql: app.Sql, resposta: Resposta): Promise<string> {
		let res: string;
		if ((res = Resposta.validar(resposta)))
			return res;

		try {
			await sql.query("insert into resposta (idpessoa, idassunto, texto, criacao) values (?, ?, ?, now())", [resposta.idpessoa, resposta.idassunto, resposta.texto]);
			resposta.id = await sql.scalar("select last_insert_id()") as number;
		} catch (e) {
			if (e.code) {
				switch (e.code) {
					case "ER_DUP_ENTRY":
						res = "Já existe uma resposta com este assunto para esta pessoa";
						break;
					case "ER_NO_REFERENCED_ROW":
					case "ER_NO_REFERENCED_ROW_2":
						res = "Pessoa ou assunto não encontrado";
						break;
					default:
						throw e;
				}
			} else {
				throw e;
			}
		}

		return res;
	}

	public static async editar(sql: app.Sql, resposta: Resposta): Promise<string> {
		let res: string;
		if ((res = Resposta.validar(resposta)))
			return res;

		try {
			await sql.query("update resposta set texto = ? where id = ? and idpessoa = ?", [resposta.texto, resposta.id, resposta.idpessoa]);
			if (!sql.affectedRows)
				res = "Resposta ou pessoa não encontrada";
		} catch (e) {
			if (e.code) {
				switch (e.code) {
					case "ER_DUP_ENTRY":
						res = "Já existe uma resposta com este assunto para esta pessoa";
						break;
					case "ER_NO_REFERENCED_ROW":
					case "ER_NO_REFERENCED_ROW_2":
						res = "Pessoa ou assunto não encontrado";
						break;
					default:
						throw e;
				}
			} else {
				throw e;
			}
		}

		return res;
	}

	public static async excluir(sql: app.Sql, id: number, idpessoa: number): Promise<string> {
		await sql.query("delete from resposta where id = ? and idpessoa = ?", [id, idpessoa]);
		return sql.affectedRows.toString();
	}
};
