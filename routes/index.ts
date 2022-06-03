import app = require("teem");
import abrangencias = require("../models/abrangencia");
import caracteristicas = require("../models/caracteristica");
import estados = require("../models/estado");
import macroCategorias = require("../models/macroCategoria");
import ods = require("../models/ods");
import Projeto = require("../models/projeto");
import status = require("../models/status");
import Usuario = require("../models/usuario");

class IndexRoute {
	@app.http.hidden()
	public static async renderIndex(id: string | null, req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);

		res.render("index/index", {
			layout: "layout-sem-form",
			usuario: u,
			projetoId: id,
			clipboard: true,
			mapa: true,
			cidades: true,
			estados: estados.lista,
			estadosJSON: estados.idsJSON,
			abrangenciasJSON: abrangencias.idsJSON,
			caracteristicasJSON: caracteristicas.idsJSON,
			macroCategoriasJSON: macroCategorias.idsJSON,
			statusJSON: status.idsJSON,
			ods: ods.lista,
			lista: await Projeto.listarExterno(),
			destaques: await Projeto.listarDestaquesExterno()
		});
	}

	public static async index(req: app.Request, res: app.Response): Promise<void> {
		return IndexRoute.renderIndex(null, req, res);
	}

	public static async quemSomos(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);

		res.render("index/quem-somos", {
			layout: "layout-sem-form",
			usuario: u
		});
	}

	public static async dashboard(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u) {
			res.redirect(app.root + "/login");
		} else {
			const lista = (u.admin ? await Projeto.listar(u.id, u.admin, true) : null);

			res.render(u.admin ? ((lista && lista.length) ? "index/dashboard-admin" : "index/dashboard-admin-vazio") : "index/dashboard-comum", {
				layout: ((lista && lista.length) ? "layout-tabela" : "layout-sem-form"),
				titulo: "Dashboard",
				usuario: u,
				datatables: (lista && lista.length),
				lista
			});
		}
	}

	@app.http.all()
	public static async login(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u) {
			let mensagem: string | null = null;
	
			if (req.body.email || req.body.senha) {
				[mensagem, u] = await Usuario.efetuarLogin(req.body.email as string, req.body.senha as string, res);
				if (mensagem)
					res.render("index/login", { layout: "layout-basico", mensagem: mensagem });
				else
					res.redirect(app.root + "/dashboard");
			} else {
				res.render("index/login", { layout: "layout-basico", mensagem: null });
			}
		} else {
			res.redirect(app.root + "/dashboard");
		}
	}

	public static async registro(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.render("index/registro", { layout: "layout-basico", titulo: "Registro" });
		else
			res.redirect(app.root + "/dashboard");
	}

	public static async redefinirSenha(req: app.Request, res: app.Response) {
		const i = req.url.indexOf("?");
		res.render("index/redefinirSenha", {
			layout: "layout-basico",
			token: ((i >= 0) ? req.url.substr(i + 1) : null)
		});
	}

	public static async confirmacao(req: app.Request, res: app.Response) {
		const i = req.url.indexOf("?");
		res.render("index/confirmacao", {
			layout: "layout-basico",
			mensagem: await Usuario.confirmarEmail((i >= 0) ? req.url.substr(i + 1) : null)
		});
	}

	public static async acesso(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.redirect(app.root + "/login");
		else
			res.render("index/acesso", {
				layout: "layout-sem-form",
				titulo: "Sem Permissão",
				usuario: u
			});
	}

	public static async perfil(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.redirect(app.root + "/login");
		else
			res.render("index/perfil", {
				titulo: "Meu Perfil",
				usuario: u
			});
	}

	public static async logout(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (u)
			await Usuario.efetuarLogout(u, res);
		res.redirect(app.root + "/");
	}
}

export = IndexRoute;
