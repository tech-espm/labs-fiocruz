import ItemNomeado = require("../data/itemNomeado");
import ListaNomeada = require("../data/listaNomeada");
import Status = require("../enums/status");

// Manter sincronizado com enums/status.ts
const status = new ListaNomeada([
	new ItemNomeado(Status.Discussao, "Discussão com a comunidade"),
	new ItemNomeado(Status.Elaboracao, "Elaboração da metodologia"),
	new ItemNomeado(Status.BuscaParcerias, "Busca por parcerias"),
	new ItemNomeado(Status.Aplicacao, "Em aplicação"),
	new ItemNomeado(Status.Concluido, "Concluído")
]);

export = status;
