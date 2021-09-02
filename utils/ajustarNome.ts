const regA = /[áàãâä@]/g, regE = /[éèêë&]/g, regI = /[íìîï]/g, regO = /[óòõôö]/g, regU = /[úùûü]/g, regC = /ç/g, regEspaco = /\s/g, regRemover = /[\"\'\[\]\(\)\{\}\$\%\!\/\\\?\*\.\=\|\~\`\^\,\<\>\:\;]/g;

export = function ajustarNome(nome: string): string {
	if (!nome || !(nome = nome.normalize().trim()))
		return nome;
	return nome.toLowerCase().replace(regA, "a").replace(regE, "e").replace(regI, "i").replace(regO, "o").replace(regU, "u").replace(regC, "c").replace(regRemover, "").replace(regEspaco, "-");
}
