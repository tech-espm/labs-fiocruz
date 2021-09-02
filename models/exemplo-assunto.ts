import app = require("teem");

export = class Assunto {
	public id: number;
	public nome: string;
	public respostapadrao: string;
	public criacao: string;

	private static validar(assunto: Assunto): string {
		if (!assunto)
			return "Assunto inválido";

		assunto.id = parseInt(assunto.id as any);
		if (isNaN(assunto.id) || assunto.id < 1 || assunto.id > 9999)
			return "Id inválido";

		assunto.nome = (assunto.nome || "").normalize().trim();
		if (assunto.nome.length < 3 || assunto.nome.length > 100)
			return "Nome inválido";

		assunto.respostapadrao = (assunto.respostapadrao || "").normalize().trim();
		if (assunto.respostapadrao.length > 10000)
			return "Resposta padrão inválida";

		return null;
	}

	public static listar(): Promise<Assunto[]> {
		return app.sql.connect(async (sql) => {
			return (await sql.query("select id, nome, date_format(criacao, '%d/%m/%Y') criacao from assunto order by nome asc")) as Assunto[] || [];
		});
	}

	public static obter(id: number): Promise<Assunto> {
		return app.sql.connect(async (sql) => {
			const lista = (await sql.query("select id, nome, respostapadrao, date_format(criacao, '%d/%m/%Y') from assunto where id = ?", [id])) as Assunto[];
			return (lista && lista[0]) || null;
		});
	}

	public static criar(assunto: Assunto): Promise<string> {
		const erro = Assunto.validar(assunto);
		if (erro)
			return Promise.resolve(erro);

		return app.sql.connect(async (sql) => {
			try {
				await sql.query("insert into assunto (id, nome, respostapadrao, criacao) values (?, ?, ?, now())", [assunto.id, assunto.nome, assunto.respostapadrao]);
				return null;
			} catch (e) {
				if (e.code && e.code === "ER_DUP_ENTRY")
					return `O assunto ${assunto.nome} ou o id ${assunto.id} já existe`;
				throw e;
			}
		});
	}

	public static editar(assunto: Assunto): Promise<string> {
		const erro = Assunto.validar(assunto);
		if (erro)
			return Promise.resolve(erro);

		return app.sql.connect(async (sql) => {
			try {
				await sql.query("update assunto set nome = ?, respostapadrao = ? where id = ?", [assunto.nome, assunto.respostapadrao, assunto.id]);
				return (sql.affectedRows ? null : "Assunto não encontrado");
			} catch (e) {
				if (e.code && e.code === "ER_DUP_ENTRY")
					return `O assunto ${assunto.nome} já existe`;
				throw e;
			}
		});
	}

	public static excluir(id: number): Promise<string> {
		return app.sql.connect(async (sql) => {
			await sql.query("delete from assunto where id = ?", [id]);
			return (sql.affectedRows ? null : "Assunto não encontrado");
		});
	}
};
