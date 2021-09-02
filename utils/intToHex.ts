
export = function intToHex(x: number): string {
	let s = "0000000" + x.toString(16);
	return s.substring(s.length - 8);
}
