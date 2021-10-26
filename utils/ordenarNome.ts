function comparadorNome(a: any, b: any): number {
	return ((a.nome < b.nome) ? -1 : ((a.nome > b.nome) ? 1 : 0));
}

export = function ordenarNomes<T>(lista: T[]): T[] {
	if (!lista || !lista.length)
		return lista;
	lista.sort(comparadorNome);
	return lista;
}
