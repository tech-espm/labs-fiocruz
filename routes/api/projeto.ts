import app = require("teem");
import Projeto = require("../../models/projeto");
import Usuario = require("../../models/usuario");

class ProjetoApiRoute {
	public static async listarExterno(req: app.Request, res: app.Response) {
		res.json(await Projeto.listarExterno());
	}

	public static async listarNaoAprovados(req: app.Request, res: app.Response) {
		const u = await Usuario.cookie(req, res);
		if (!u)
			return;

		res.json(await Projeto.listar(u.id, u.admin, true));
	}

	public static async listar(req: app.Request, res: app.Response) {
		const u = await Usuario.cookie(req, res);
		if (!u)
			return;

		res.json(await Projeto.listar(u.id, u.admin));
	}

	@app.http.post()
	public static async criar(req: app.Request, res: app.Response) {
		const u = await Usuario.cookie(req, res);
		if (!u)
			return;

		const erro = await Projeto.criar(req.body, u.id, u.admin);

		if (erro) {
			res.status(400).json(erro);
			return;
		}

		res.sendStatus(204);
	}

	@app.http.post()
	public static async editar(req: app.Request, res: app.Response) {
		const u = await Usuario.cookie(req, res);
		if (!u)
			return;

		const erro = await Projeto.editar(req.body, u.id, u.admin);

		if (erro) {
			res.status(400).json(erro);
			return;
		}

		res.sendStatus(204);
	}

	// A API de aprovação foi removida para fazer com que o projeto todo seja visto (incluindo as fotos) antes da aprovação.
	// @app.http.post()
	// public static async aprovar(req: app.Request, res: app.Response) {
	// 	const u = await Usuario.cookie(req, res, true);
	// 	if (!u)
	// 		return;

	// 	const id = parseInt(req.query["id"] as string);

	// 	if (isNaN(id)) {
	// 		res.status(400).json("Id inválido");
	// 		return;
	// 	}

	// 	const erro = await Projeto.aprovar(id);

	// 	if (erro) {
	// 		res.status(400).json(erro);
	// 		return;
	// 	}

	// 	res.sendStatus(204);
	// }

	@app.http.delete()
	public static async excluir(req: app.Request, res: app.Response) {
		const u = await Usuario.cookie(req, res);
		if (!u)
			return;

		const id = parseInt(req.query["id"] as string);

		if (isNaN(id)) {
			res.status(400).json("Id inválido");
			return;
		}

		const erro = await Projeto.excluir(id, u.id, u.admin);

		if (erro) {
			res.status(400).json(erro);
			return;
		}

		res.sendStatus(204);
	}
}

export = ProjetoApiRoute;
