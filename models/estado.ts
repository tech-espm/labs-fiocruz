import ItemNomeado = require("../data/itemNomeado");
import ListaNomeada = require("../data/listaNomeada");

class Estado extends ItemNomeado {
	public readonly sigla: string;

	public constructor(id: number, nome: string, sigla: string) {
		super(id, nome);
		this.sigla = sigla;
	}
}

const estados = new ListaNomeada([
	new Estado(1, "ACRE", "AC"),
	new Estado(2, "ALAGOAS", "AL"),
	new Estado(3, "AMAPÁ", "AP"),
	new Estado(4, "AMAZONAS", "AM"),
	new Estado(5, "BAHIA", "BA"),
	new Estado(6, "CEARÁ", "CE"),
	new Estado(7, "DISTRITO FEDERAL", "DF"),
	new Estado(8, "ESPIRITO SANTO", "ES"),
	new Estado(9, "GOIÁS", "GO"),
	new Estado(10, "MARANHÃO", "MA"),
	new Estado(11, "MATO GROSSO DO SUL", "MS"),
	new Estado(12, "MATO GROSSO", "MT"),
	new Estado(13, "MINAS GERAIS", "MG"),
	new Estado(14, "PARÁ", "PA"),
	new Estado(15, "PARAÍBA", "PB"),
	new Estado(16, "PARANÁ", "PR"),
	new Estado(17, "PERNAMBUCO", "PE"),
	new Estado(18, "PIAUÍ", "PI"),
	new Estado(19, "RIO DE JANEIRO", "RJ"),
	new Estado(20, "RIO GRANDE DO NORTE", "RN"),
	new Estado(21, "RIO GRANDE DO SUL", "RS"),
	new Estado(22, "RONDÔNIA", "RO"),
	new Estado(23, "RORAIMA", "RR"),
	new Estado(24, "SANTA CATARINA", "SC"),
	new Estado(25, "SÃO PAULO", "SP"),
	new Estado(26, "SERGIPE", "SE"),
	new Estado(27, "TOCANTINS", "TO")
]);

export = estados;
