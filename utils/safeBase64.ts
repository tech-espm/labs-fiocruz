
export = class SafeBase64 {
	private static readonly RegExpE1 = /\+/g;
	private static readonly RegExpE2 = /\//g;
	private static readonly RegExpE3 = /\=/g;

	private static readonly RegExpD1 = /\_/g;
	private static readonly RegExpD2 = /\-/g;

	public static encode(buffer: Buffer): string {
		return buffer.toString("base64").replace(SafeBase64.RegExpE1, "_").replace(SafeBase64.RegExpE2, "-").replace(SafeBase64.RegExpE3, "");
	}

	public static decode(base64String: string): Buffer {
		base64String = base64String.replace(SafeBase64.RegExpD1, "+").replace(SafeBase64.RegExpD2, "/");
		const faltantes = 4 - (base64String.length & 3);
		if (faltantes < 4)
			base64String = base64String.padEnd(base64String.length + faltantes, "=");
		return Buffer.from(base64String, "base64");
	}
}
