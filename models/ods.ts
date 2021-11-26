import ItemNomeado = require("../data/itemNomeado");
import ListaNomeada = require("../data/listaNomeada");
import ODS = require("../enums/ods");

// Manter sincronizado com enums/ods.ts e sql/script.sql
const ods = new ListaNomeada([
	new ItemNomeado(ODS.ErradicacaoPobreza, "Erradicação da pobreza"),
	new ItemNomeado(ODS.FomeZeroAgriculturaSustentavel, "Fome zero e agricultura sustentável"),
	new ItemNomeado(ODS.SaudeBemEstar, "Saúde e bem-estar"),
	new ItemNomeado(ODS.EducacaoQualidade, "Educação de qualidade"),
	new ItemNomeado(ODS.IgualdadeGenero, "Igualdade de gênero"),
	new ItemNomeado(ODS.AguaLimpaSaneamento, "Água limpa e saneamento"),
	new ItemNomeado(ODS.EnergiaLimpaAcessivel, "Energia limpa e acessível"),
	new ItemNomeado(ODS.TrabalhoDecenteCrescimentoEconomico, "Trabalho decente e crescimento econômico"),
	new ItemNomeado(ODS.IndustriaInovacaoInfraestrutura, "Indústria, Inovação e infraestrutura"),
	new ItemNomeado(ODS.ReducaoDesigualdades, "Redução das desigualdades"),
	new ItemNomeado(ODS.CidadesComunidadesSustentaveis, "Cidades e comunidades sustentáveis"),
	new ItemNomeado(ODS.ConsumoProducaoResponsaveis, "Consumo e produção responsáveis"),
	new ItemNomeado(ODS.AcaoContraMudancaGlobalClima, "Ação contra a mudança global do clima"),
	new ItemNomeado(ODS.VidaAgua, "Vida na água"),
	new ItemNomeado(ODS.VidaTerrestre, "Vida terrestre"),
	new ItemNomeado(ODS.PazJusticaInstituicoesEficazes, "Paz, justiça e instituições eficazes"),
	new ItemNomeado(ODS.ParceriasMeiosImplementacao, "Parcerias e meios de implementação")
]);

export = ods;
