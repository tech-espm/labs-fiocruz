"use strict";
exports.__esModule = true;
var app = require("teem");
var appsettings = require("./appsettings");
var Perfil = require("./enums/perfil");
app.run({
    root: appsettings.root,
    port: appsettings.port,
    sqlConfig: appsettings.sqlPool,
    onInit: function () {
        app.express.locals.Perfil = Perfil;
    },
    htmlErrorHandler: function (err, req, res, next) {
        // Como é um ambiente de desenvolvimento, deixa o objeto do erro
        // ir para a página, que possivelmente exibirá suas informações
        res.render("index/erro", { layout: "layout-externo", mensagem: (err.status === 404 ? null : (err.message || "Ocorreu um erro desconhecido")), erro: err });
    }
});
