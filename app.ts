import app = require("teem");
import appsettings = require("./appsettings");
import Perfil = require("./enums/perfil");
import Projeto = require("./models/projeto");
import safeStringify = require("./utils/safeStringify");

app.run({
	localIp: appsettings.localIp,
	root: appsettings.root,
	port: appsettings.port,
	sqlConfig: appsettings.sqlConfig,

	onInit: function () {
		app.express.locals.urlSite = appsettings.urlSite;
		app.express.locals.Perfil = Perfil;
		app.express.locals.PrefixoAbsolutoIcone = Projeto.PrefixoAbsolutoIcone;
		app.express.locals.PrefixoAbsolutoImagem = Projeto.PrefixoAbsolutoImagem;
		app.express.locals.safeStringify = safeStringify;
	},

	onBeforeRoute: function () {
		app.express.use(function (req: app.Request, res: app.Response, next: app.NextFunction) {
			res.locals["darkMode"] = (parseInt(req.cookies["darkMode"]) ? "-d" : "");
			next();
		});
	},

	htmlErrorHandler: function (err: any, req: app.Request, res: app.Response, next: app.NextFunction) {
		// Como é um ambiente de desenvolvimento, deixa o objeto do erro
		// ir para a página, que possivelmente exibirá suas informações
		res.render("index/erro", { layout: "layout-externo", mensagem: (err.status === 404 ? null : (err.message || "Ocorreu um erro desconhecido")), erro: err });
	}
});
