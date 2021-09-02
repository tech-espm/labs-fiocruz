import ItemNomeado = require("./itemNomeado");

class ListaNomeada<T extends ItemNomeado> {
	public readonly lista: T[];
	public readonly ids: { [chave: string]: T };
	private _listaJSON: string | null;
	private _idsJSON: string | null;

	public constructor(lista: T[]) {
		this.lista = lista;
		this.ids = {};
		this._listaJSON = null;
		this._idsJSON = null;
		for (let i = 0; i < lista.length; i++)
			this.ids[lista[i].id.toString()] = lista[i];
	}

	public get listaJSON(): string {
		return (this._listaJSON || (this._listaJSON = JSON.stringify(this.lista)));
	}

	public get idsJSON(): string {
		return (this._idsJSON || (this._idsJSON = JSON.stringify(this.ids)));
	}
};

export = ListaNomeada;
