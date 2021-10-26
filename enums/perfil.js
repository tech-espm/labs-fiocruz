"use strict";
// Manter sincronizado com models/perfil.ts e sql/script.sql
var Perfil;
(function (Perfil) {
    Perfil[Perfil["Administrador"] = 1] = "Administrador";
    Perfil[Perfil["Comum"] = 2] = "Comum";
})(Perfil || (Perfil = {}));
;
module.exports = Perfil;
