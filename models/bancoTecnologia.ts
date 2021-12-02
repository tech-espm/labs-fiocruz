import ItemNomeado = require("../data/itemNomeado");
import ListaNomeada = require("../data/listaNomeada");
import BancoTecnologia = require("../enums/bancoTecnologia");

// Manter sincronizado com enums/bancoTecnologia.ts
const bancosTecnologia = new ListaNomeada([
	new ItemNomeado(BancoTecnologia.Nenhum, "Nenhum"),
	new ItemNomeado(BancoTecnologia.FSS, "Feira de Soluções para a Saúde"),
	new ItemNomeado(BancoTecnologia.PITSS, "Programa Institucional de Territórios Sustentáveis e Saudáveis (PITSS)"),
	new ItemNomeado(BancoTecnologia.TEIAS, "Projeto TEIAS"),
	new ItemNomeado(BancoTecnologia.IdeiaSUS, "Ideia SUS"),
	new ItemNomeado(BancoTecnologia.BTSFBB, "BTS da Fundação Banco do Brasil"),
	new ItemNomeado(BancoTecnologia.Outro, "Outro")
]);

export = bancosTecnologia;
