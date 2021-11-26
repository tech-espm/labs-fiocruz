import app = require("teem");
import Projeto = require("../models/projeto");
import Usuario = require("../models/usuario");

class ProjetoRoute {
	public static async index(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.redirect(app.root + "/login");
		else
			res.render("index/index", {
				layout: "layout-sem-form",
				titulo: "Dashboard",
				usuario: u
			});
	}

	@app.http.all()
	public static async login(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u) {
			let mensagem: string = null;
	
			if (req.body.email || req.body.senha) {
				[mensagem, u] = await Usuario.efetuarLogin(req.body.email as string, req.body.senha as string, res);
				if (mensagem)
					res.render("index/login", { layout: "layout-basico", mensagem: mensagem });
				else
					res.redirect(app.root + "/");
			} else {
				res.render("index/login", { layout: "layout-basico", mensagem: null });
			}
		} else {
			res.redirect(app.root + "/");
		}
	}

	public static async registro(req: app.Request, res: app.Response) {
		res.render("index/registro", { layout: "layout-basico", titulo: "Registro" });
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
			res.redirect(app.root + "/");
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

export = ProjetoRoute;
