import app = require("teem");
import Usuario = require("../models/usuario");

class ExemploRoute {
	public static async animacoes(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.redirect(app.root + "/login");
		else
			res.render("exemplo/animacoes", { layout: "layout-sem-form", titulo: "Animações", usuario: u });
	}

	public static async bordas(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.redirect(app.root + "/login");
		else
			res.render("exemplo/bordas", { layout: "layout-sem-form", titulo: "Bordas", usuario: u });
	}

	public static async botoes(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.redirect(app.root + "/login");
		else
			res.render("exemplo/botoes", { layout: "layout-sem-form", titulo: "Botões", usuario: u });
	}

	public static async cards(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.redirect(app.root + "/login");
		else
			res.render("exemplo/cards", { layout: "layout-sem-form", titulo: "Cards", usuario: u });
	}

	public static async cores(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.redirect(app.root + "/login");
		else
			res.render("exemplo/cores", { layout: "layout-sem-form", titulo: "Cores", usuario: u });
	}

	public static async data(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.redirect(app.root + "/login");
		else
			res.render("exemplo/data", { layout: "layout-sem-form", titulo: "Data", datepicker: true, usuario: u });
	}

	public static async esqueci(req: app.Request, res: app.Response) {
		res.render("exemplo/esqueci", { layout: "layout-externo", titulo: "Esqueci minha senha" });
	}

	public static async cadastroProjeto(req: app.Request, res: app.Response) {
		res.render("exemplo/cadastro-projeto", { layout: "layout-externo", titulo: "Cadastro de Projeto" });
	}

	public static async cadastroTec(req: app.Request, res: app.Response) {
		res.render("exemplo/cadastro-projeto2", { layout: "layout-externo", titulo: "Cadastro de Projeto" });
	}

	public static async cadastroContato(req: app.Request, res: app.Response) {
		res.render("exemplo/cadastro-projeto3", { layout: "layout-externo", titulo: "Cadastro de Projeto" });
	}

	public static async graficos(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.redirect(app.root + "/login");
		else
			res.render("exemplo/graficos", { layout: "layout-sem-form", titulo: "Gráficos", usuario: u });
	}

	public static async outros(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.redirect(app.root + "/login");
		else
			res.render("exemplo/outros", { layout: "layout-sem-form", titulo: "Outros", usuario: u });
	}

	public static async registro(req: app.Request, res: app.Response) {
		res.render("exemplo/registro", { layout: "layout-externo", titulo: "Registro" });
	}

	public static async tabelas(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.redirect(app.root + "/login");
		else
			res.render("exemplo/tabelas", { layout: "layout-tabela", titulo: "Tabelas", datatables: true, usuario: u });
	}

	public static async vazia(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.redirect(app.root + "/login");
		else
			res.render("exemplo/vazia", { titulo: "Vazia", usuario: u });
	}

	public static async vaziasemform(req: app.Request, res: app.Response) {
		let u = await Usuario.cookie(req);
		if (!u)
			res.redirect(app.root + "/login");
		else
			res.render("exemplo/vazia", { layout: "layout-sem-form", titulo: "Vazia (Sem Form)", usuario: u });
	}
}

export = ExemploRoute;
