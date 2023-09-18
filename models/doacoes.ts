import app = require("teem");

class Doacoes {
    public static async getDoacoes(): Promise<any[]> {
        let lista: any[] = [];

        await app.sql.connect(async (sql) => {
            lista = await sql.query("SELECT CASE WHEN anonimo = 0 THEN u.nome WHEN anonimo = 1 THEN 'Anônimo' end as nome, p.nome AS nome_projeto, d.valor, d.data FROM doacoes d INNER JOIN usuario u ON d.idusuario = u.id INNER JOIN projeto p ON d.idprojeto = p.id");
        }); 

        return lista;
    };
}

export = Doacoes;
