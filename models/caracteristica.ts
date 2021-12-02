import ItemNomeado = require("../data/itemNomeado");
import ListaNomeada = require("../data/listaNomeada");
import Caracteristica = require("../enums/caracteristica");

// Manter sincronizado com enums/caracteristica.ts
const caracteristicas = new ListaNomeada([
	new ItemNomeado(Caracteristica.AbordaPobreza, "Aborda problemas de pobreza"),
	new ItemNomeado(Caracteristica.AbordaDireitos, "Aborda os desafios dos direitos humanos, a justiça social, a equidade para todos os povos"),
	new ItemNomeado(Caracteristica.AbordaGenero, "Aborda a discriminação de gênero"),
	new ItemNomeado(Caracteristica.ConsultaPublica, "Estabelece rotas de acesso à informação e para consulta pública"),
	new ItemNomeado(Caracteristica.Inovadora, "Metodologia inovadora"),
	new ItemNomeado(Caracteristica.Sustentavel, "Aborda o uso sustentável de recursos, as áreas naturais e o conhecimento tradicional"),
	new ItemNomeado(Caracteristica.Indigena, "Respeita / Inclui direitos de povos indígenas e comunidades locais"),
	new ItemNomeado(Caracteristica.PopulacaoLocal, "Contribui no fortalecimento do trabalho e renda da população local"),
	new ItemNomeado(Caracteristica.ResolucaoConflitos, "Promove a resolução pacífica de conflitos"),
	new ItemNomeado(Caracteristica.Metodologia, "Possui uma sistematização / metodologia / passo-a-passo"),
	new ItemNomeado(Caracteristica.TrocaInformacoes, "Promove a troca de conhecimentos e experiências entre os profissionais / instituições de pesquisa / ensino / ONG e a comunidade"),
	new ItemNomeado(Caracteristica.Agentes, "Forma agentes disseminadores do projeto")
]);

export = caracteristicas;
