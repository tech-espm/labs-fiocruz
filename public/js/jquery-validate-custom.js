"use strict";

// 1.0.0

$.validator.addMethod("emailCustom", function (value) {
	return (!value || window.validateEmail(value));
}, "Por favor, forneça um endereço de email válido.");

$.validator.addMethod("colorHex", function (value) {
	return (!value || window.validateColor(value));
}, "Por favor, forneça uma cor no formato #RRGGBB.");
