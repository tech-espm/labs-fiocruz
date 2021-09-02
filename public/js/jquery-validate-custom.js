"use strict";

// 1.0.0

$.validator.addMethod("emailCustom", function (value) {
	return (!value || window.validateEmail(value));
}, "Por favor, forneça um endereço de email válido.");
