import ItemNomeado = require("../data/itemNomeado");
import ListaNomeada = require("../data/listaNomeada");
import Divulgacao = require("../enums/divulgacao");

// Manter sincronizado com enums/macroCategoria.ts
const divulgacoes = new ListaNomeada([
	new ItemNomeado(Divulgacao.TV, "TV"),
	new ItemNomeado(Divulgacao.Radio, "Rádio"),
	new ItemNomeado(Divulgacao.Jornais, "Jornais"),
	new ItemNomeado(Divulgacao.Revistas, "Revistas"),
	new ItemNomeado(Divulgacao.InternetRedesSociais, "Internet/Redes sociais"),
	new ItemNomeado(Divulgacao.OficinasReunioes, "Oficinas e reuniões"),
	new ItemNomeado(Divulgacao.SeminariosPalestras, "Seminários e palestras"),
	new ItemNomeado(Divulgacao.PublicacoesCientificas, "Publicações científicas"),
	new ItemNomeado(Divulgacao.Outros, "Outros")
]);

export = divulgacoes;
