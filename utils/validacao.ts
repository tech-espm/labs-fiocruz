
export = class Validacao {
	public static isDocumento(cnpjOuCPF: string | null): boolean {
		return (cnpjOuCPF ? ((cnpjOuCPF.length === 14) ? Validacao.isCPF(cnpjOuCPF) : Validacao.isCNPJ(cnpjOuCPF)) : false);
	}

	public static isCNPJ(cnpj: string | null): boolean {
		if (!cnpj || !(cnpj = cnpj.replace(/\./g, "").replace(/\-/g, "").replace(/\//g, "").trim()) || cnpj.length !== 14)
			return false;

		let sum = 0;

		for (let i = 0; i < 12; i++)
			sum += (cnpj.charCodeAt(i) - 0x30) * (((i < 4) ? 5 : 13) - i);
		var modulus = sum % 11;
		if (modulus < 2)
			modulus = 0;
		else
			modulus = 11 - modulus;

		if ((cnpj.charCodeAt(12) - 0x30) !== modulus)
			return false;

		sum = 0;
		for (let i = 0; i < 13; i++)
			sum += (cnpj.charCodeAt(i) - 0x30) * (((i < 5) ? 6 : 14) - i);
		modulus = sum % 11;
		if (modulus < 2)
			modulus = 0;
		else
			modulus = 11 - modulus;

		return ((cnpj.charCodeAt(13) - 0x30) === modulus);
	}

	public static isCPF(cpf: string | null): boolean {
		if (!cpf || !(cpf = cpf.replace(/\./g, "").replace(/\-/g, "").trim()) || cpf.length !== 11)
			return false;

		let sum = 1, firstChar = cpf.charCodeAt(0);

		for (let i = 1; i < 9; i++) {
			if (cpf.charCodeAt(i) !== firstChar) {
				sum = 0;
				break;
			}
		}
		if (sum)
			return false;

		sum = 0;
		for (let i = 0; i < 9; i++)
			sum += (cpf.charCodeAt(i) - 0x30) * (10 - i);
		var modulus = sum % 11;
		if (modulus < 2)
			modulus = 0;
		else
			modulus = 11 - modulus;

		if ((cpf.charCodeAt(9) - 0x30) !== modulus)
			return false;

		sum = modulus * 2;
		for (let i = 0; i < 9; i++)
			sum += (cpf.charCodeAt(i) - 0x30) * (11 - i);
		modulus = sum % 11;
		if (modulus < 2)
			modulus = 0;
		else
			modulus = 11 - modulus;

		return ((cpf.charCodeAt(10) - 0x30) === modulus);
	}

	public static isEmail(email: string | null): boolean {
		if (!email || !(email = email.trim()))
			return false;

		const arroba = email.indexOf("@"),
			arroba2 = email.lastIndexOf("@"),
			ponto = email.lastIndexOf(".");

		return (email.indexOf(":") < 0 && arroba > 0 && ponto > (arroba + 1) && ponto !== (email.length - 1) && arroba2 === arroba);
	}
};
