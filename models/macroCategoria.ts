import ItemNomeado = require("../data/itemNomeado");
import ListaNomeada = require("../data/listaNomeada");
import MacroCategoria = require("../enums/macroCategoria");

// Manter sincronizado com enums/macroCategoria.ts
const macroCategorias = new ListaNomeada([
	new ItemNomeado(MacroCategoria.DeterminantesSociaisSaude, "Determinantes Sociais da Saúde"),
	new ItemNomeado(MacroCategoria.EconomiaCircular, "Economia Circular"),
	new ItemNomeado(MacroCategoria.PreservacaoMeioAmbiente, "Preservação do Meio Ambiente"),
	new ItemNomeado(MacroCategoria.DireitosHumanos, "Direitos Humanos"),
	new ItemNomeado(MacroCategoria.MobilizacaoSocial, "Mobilização Social"),
	new ItemNomeado(MacroCategoria.InteracaoSocial, "Interação Social"),
	new ItemNomeado(MacroCategoria.PrevencaoDesastres, "Prevenção de Desastres"),
	new ItemNomeado(MacroCategoria.ManejoConscienteBiodiversidadeLocal, "Manejo Consciente da Biodiversidade Local"),
	new ItemNomeado(MacroCategoria.ParticipacaoSocial, "Participação Social"),
	new ItemNomeado(MacroCategoria.GovernancaTerritorialDemocratica, "Governança Territorial Democrática"),
	new ItemNomeado(MacroCategoria.Outra, "Outra")
]);

export = macroCategorias;
