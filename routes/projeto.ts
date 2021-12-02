import app = require("teem");
import abrangencias = require("../models/abrangencia");
import bancosTecnologia = require("../models/bancoTecnologia");
import caracteristicas = require("../models/caracteristica");
import divulgacoes = require("../models/divulgacao");
import estados = require("../models/estado");
import macroCategorias = require("../models/macroCategoria");
import ods = require("../models/ods");
import status = require("../models/status");
import Projeto = require("../models/projeto");
import Usuario = require("../models/usuario");

class ProjetoRoute {
	public static async criar(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.redirect(app.root + "/acesso");
		else
			res.render("projeto/editar", {
				titulo: "Criar Projeto",
				textoSubmit: "Criar",
				usuario: u,
				item: null,
				mapa: true,
				cidades: true,
				estados: estados.lista,
				abrangencias: abrangencias.lista,
				bancosTecnologia: bancosTecnologia.lista,
				caracteristicas: caracteristicas.lista,
				divulgacoes: divulgacoes.lista,
				macroCategorias: macroCategorias.lista,
				ods: ods.lista,
				status: status.lista,
				TamanhoMaximoIconeEmBytes: Projeto.TamanhoMaximoIconeEmBytes,
				TamanhoMaximoImagemEmBytes: Projeto.TamanhoMaximoImagemEmBytes
			});
	}

	public static async editar(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u) {
			res.redirect(app.root + "/acesso");
		} else {
			let id = parseInt(req.query["id"] as string);
			let item: Projeto | null = null;
			if (isNaN(id) || !(item = await Projeto.obter(id, u.id, u.admin)))
				res.render("index/nao-encontrado", {
					layout: "layout-sem-form",
					usuario: u
				});
			else
				res.render("projeto/editar", {
					titulo: "Editar Projeto",
					usuario: u,
					item: item,
					mapa: true,
					cidades: true,
					estados: estados.lista,
					abrangencias: abrangencias.lista,
					bancosTecnologia: bancosTecnologia.lista,
					caracteristicas: caracteristicas.lista,
					divulgacoes: divulgacoes.lista,
					macroCategorias: macroCategorias.lista,
					ods: ods.lista,
					status: status.lista,
					TamanhoMaximoIconeEmBytes: Projeto.TamanhoMaximoIconeEmBytes,
					TamanhoMaximoImagemEmBytes: Projeto.TamanhoMaximoImagemEmBytes
				});
		}
	}

	public static async listar(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.redirect(app.root + "/acesso");
		else
			res.render("projeto/listar", {
				layout: "layout-tabela",
				titulo: "Gerenciar Projetos",
				usuario: u,
				datatables: true,
				lista: await Projeto.listar(u.id, u.admin)
			});
	}
}

export = ProjetoRoute;
