import app = require("teem");
import Usuario = require("../models/usuario");

class ExemploRoute {
	public static async animacoes(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.redirect(app.root + "/login");
		else
			res.render("exemplo/animacoes", { titulo: "Animações", usuario: u });
	}

	public static async bordas(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.redirect(app.root + "/login");
		else
			res.render("exemplo/bordas", { titulo: "Bordas", usuario: u });
	}

	public static async botoes(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.redirect(app.root + "/login");
		else
			res.render("exemplo/botoes", { titulo: "Botões", usuario: u });
	}

	public static async cards(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.redirect(app.root + "/login");
		else
			res.render("exemplo/cards", { titulo: "Cards", usuario: u });
	}

	public static async cores(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.redirect(app.root + "/login");
		else
			res.render("exemplo/cores", { titulo: "Cores", usuario: u });
	}

	public static async data(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.redirect(app.root + "/login");
		else
			res.render("exemplo/data", { titulo: "Data", datepicker: true, usuario: u });
	}

	public static async esqueci(req: app.Request, res: app.Response) {
		res.render("exemplo/esqueci", { layout: "layout-externo", titulo: "Esqueci minha senha" });
	}

	public static async graficos(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.redirect(app.root + "/login");
		else
			res.render("exemplo/graficos", { titulo: "Gráficos", usuario: u });
	}

	public static async outros(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.redirect(app.root + "/login");
		else
			res.render("exemplo/outros", { titulo: "Outros", usuario: u });
	}

	public static async registro(req: app.Request, res: app.Response) {
		res.render("exemplo/registro", { layout: "layout-externo", titulo: "Registro" });
	}

	public static async tabelas(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.redirect(app.root + "/login");
		else
			res.render("exemplo/tabelas", { titulo: "Tabelas", datatables: true, usuario: u });
	}

	public static async vazia(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.redirect(app.root + "/login");
		else
			res.render("exemplo/vazia", { titulo: "Vazia", usuario: u });
	}
}

export = ExemploRoute;
