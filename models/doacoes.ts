import app = require("teem");

class Doacoes {
    public static async getDoacoes(): Promise<any[]> {
        let lista: any[] = [];

        await app.sql.connect(async (sql) => {
            lista = await sql.query("select * from doacoes");
        }); 

        return lista;
    };
}

export = Doacoes;
