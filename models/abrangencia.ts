import ItemNomeado = require("../data/itemNomeado");
import ListaNomeada = require("../data/listaNomeada");
import Abrangencia = require("../enums/abrangencia");

// Manter sincronizado com enums/abrangencia.ts
const abrangencias = new ListaNomeada([
	new ItemNomeado(Abrangencia.Local, "Local"),
	new ItemNomeado(Abrangencia.Municipal, "Municipal"),
	new ItemNomeado(Abrangencia.Estadual, "Estadual"),
	new ItemNomeado(Abrangencia.Nacional, "Nacional"),
	new ItemNomeado(Abrangencia.Internacional, "Internacional")
]);

export = abrangencias;
