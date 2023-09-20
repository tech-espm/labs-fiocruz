import app = require("teem");

interface Doacoes{
    idusuario: number;
    idprojeto: number;
    valor: number;
    anonimo: number;
}

class Doacoes {

    //Método para listar as doações
    public static async getDoacoes(): Promise<any[]> {
        let lista: any[] = [];

        //Select da Lista de Doações
        await app.sql.connect(async (sql) => {
            lista = await sql.query("SELECT u.nome, p.nome AS nome_projeto, d.valor, d.data, anonimo FROM doacoes d INNER JOIN usuario u ON d.idusuario = u.id INNER JOIN projeto p ON d.idprojeto = p.id");
         }); 

            //Mapeando a lista de doações & removendo o nome do doador caso seja anônimo
            const pagamentos = lista.map((doador) => ({
              idusuario: doador.idusuario,
              idprojeto: doador.idprojeto,
              data: doador.data,
              nome: doador.anonimo === 1 ? 'Anônimo' : doador.nome,
              valor: doador.valor,
              nome_projeto: doador.nome_projeto,}));
        
        return pagamentos;
    };


    //Método para cadastrar novas doações 
    public static async postDoacoes(doacao: Doacoes): Promise<boolean> {
        if(!doacao){
            throw new Error("Preencha os campos corretamente");
        }else{
            await app.sql.connect(async (sql) => {
                await sql.query("INSERT INTO doacoes (idusuario, idprojeto, valor, anonimo) VALUES (?, ?, ?, ?)", [doacao.idusuario, doacao.idprojeto, doacao.valor, doacao.anonimo]);
            });
            return true;
        }
    };
}

export = Doacoes;
