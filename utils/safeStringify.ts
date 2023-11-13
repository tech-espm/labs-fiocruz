const regexp = /\//g;

export = function safeStringify(x?: string | null): string {
	return (x ? JSON.stringify(x).replace(regexp, "\\/") : JSON.stringify(x));
}
