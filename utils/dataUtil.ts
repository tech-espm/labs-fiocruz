
export = class DataUtil {
	public static formatarBr(ano: number, mes: number, dia: number): string {
		return ((dia < 10) ? ("0" + dia) : dia) + "/" + ((mes < 10) ? ("0" + mes) : mes) + "/" + ano;
	}

	public static formatarBrComHorario(ano: number, mes: number, dia: number, hora: number, minuto: number, segundo: number): string {
		return ((dia < 10) ? ("0" + dia) : dia) + "/" + ((mes < 10) ? ("0" + mes) : mes) + "/" + ano + " " + ((hora < 10) ? ("0" + hora) : hora) + ":" + ((minuto < 10) ? ("0" + minuto) : minuto) + ":" + ((segundo < 10) ? ("0" + segundo) : segundo);
	}

	public static formatar(ano: number, mes: number, dia: number): string {
		return ano + "-" + ((mes < 10) ? ("0" + mes) : mes) + "-" + ((dia < 10) ? ("0" + dia) : dia);
	}

	public static formatarComHorario(ano: number, mes: number, dia: number, hora: number, minuto: number, segundo: number): string {
		return ano + "-" + ((mes < 10) ? ("0" + mes) : mes) + "-" + ((dia < 10) ? ("0" + dia) : dia) + " " + ((hora < 10) ? ("0" + hora) : hora) + ":" + ((minuto < 10) ? ("0" + minuto) : minuto) + ":" + ((segundo < 10) ? ("0" + segundo) : segundo);
	}

	public static converterDataISO(dataComOuSemHorario: string | null, formatoBr?: boolean): string | null {
		if (!dataComOuSemHorario || !(dataComOuSemHorario = dataComOuSemHorario.trim()))
			return null;
		let b1 = dataComOuSemHorario.indexOf("/");
		let b2 = dataComOuSemHorario.lastIndexOf("/");
		let dia: number, mes: number, ano: number;
		if (b1 <= 0 || b2 <= b1) {
			let b1 = dataComOuSemHorario.indexOf("-");
			let b2 = dataComOuSemHorario.lastIndexOf("-");
			if (b1 <= 0 || b2 <= b1)
				return null;
			ano = parseInt(dataComOuSemHorario.substring(0, b1));
			mes = parseInt(dataComOuSemHorario.substring(b1 + 1, b2));
			dia = parseInt(dataComOuSemHorario.substring(b2 + 1));
		} else {
			dia = parseInt(dataComOuSemHorario.substring(0, b1));
			mes = parseInt(dataComOuSemHorario.substring(b1 + 1, b2));
			ano = parseInt(dataComOuSemHorario.substring(b2 + 1));
		}
		if (isNaN(dia) || isNaN(mes) || isNaN(ano) ||
			dia < 1 || mes < 1 || ano < 1 ||
			dia > 31 || mes > 12 || ano > 9999)
			return null;
		switch (mes) {
			case 2:
				if (!(ano % 4) && ((ano % 100) || !(ano % 400))) {
					if (dia > 29)
						return null;
				} else {
					if (dia > 28)
						return null;
				}
				break;
			case 4:
			case 6:
			case 9:
			case 11:
				if (dia > 30)
					return null;
				break;
		}
		let sepHorario = dataComOuSemHorario.indexOf(" ");
		if (sepHorario < 0)
			sepHorario = dataComOuSemHorario.indexOf("T");
		if (sepHorario >= 0) {
			const horario = dataComOuSemHorario.substring(sepHorario + 1);
			const sepMinuto = horario.indexOf(":");
			if (sepMinuto >= 0) {
				const hora = parseInt(horario);
				const minuto = parseInt(horario.substring(sepMinuto + 1));
				if (hora >= 0 && hora <= 23 && minuto >= 0 && minuto <= 59)
					return (formatoBr ?
						DataUtil.formatarBrComHorario(ano, mes, dia, hora, minuto, 0) :
						DataUtil.formatarComHorario(ano, mes, dia, hora, minuto, 0));
			}
			return null;
		}
		return (formatoBr ?
			DataUtil.formatarBr(ano, mes, dia) :
			DataUtil.formatar(ano, mes, dia));
	}

	public static removerHorarioISO(dataISOComHorario: string): string {
		return dataISOComHorario.substring(0, 10);
	}

	public static dateUTC(deltaSegundos?: number): Date {
		return (deltaSegundos ? new Date((new Date()).getTime() + (deltaSegundos * 1000)) : new Date());
	}

	public static horarioDeBrasiliaComoDateUTC(deltaSegundos?: number): Date {
		let time = (new Date()).getTime();
		if (deltaSegundos)
			time += (deltaSegundos * 1000);
		return new Date(time - (180 * 60000));
	}

	public static horarioDeBrasiliaISO(deltaSegundos?: number): string {
		const hoje = DataUtil.horarioDeBrasiliaComoDateUTC(deltaSegundos);

		return DataUtil.formatar(hoje.getUTCFullYear(), hoje.getUTCMonth() + 1, hoje.getUTCDate());
	}

	public static horarioDeBrasiliaISOComHorario(deltaSegundos?: number): string {
		const hoje = DataUtil.horarioDeBrasiliaComoDateUTC(deltaSegundos);

		return DataUtil.formatarComHorario(hoje.getUTCFullYear(), hoje.getUTCMonth() + 1, hoje.getUTCDate(), hoje.getUTCHours(), hoje.getUTCMinutes(), hoje.getUTCSeconds());
	}

	public static horarioDeBrasiliaISOInicioDoDia(deltaSegundos?: number): string {
		const hoje = DataUtil.horarioDeBrasiliaComoDateUTC(deltaSegundos);

		return DataUtil.formatarComHorario(hoje.getUTCFullYear(), hoje.getUTCMonth() + 1, hoje.getUTCDate(), 0, 0, 0);
	}

	public static horarioDeBrasiliaISOFimDoDia(deltaSegundos?: number): string {
		const hoje = DataUtil.horarioDeBrasiliaComoDateUTC(deltaSegundos);

		return DataUtil.formatarComHorario(hoje.getUTCFullYear(), hoje.getUTCMonth() + 1, hoje.getUTCDate(), 23, 59, 59);
	}

	public static horarioUTCISO(deltaSegundos?: number): string {
		const hoje = DataUtil.dateUTC(deltaSegundos);

		return DataUtil.formatar(hoje.getUTCFullYear(), hoje.getUTCMonth() + 1, hoje.getUTCDate());
	}

	public static horarioUTCISOComHorario(deltaSegundos?: number): string {
		const hoje = DataUtil.dateUTC(deltaSegundos);

		return DataUtil.formatarComHorario(hoje.getUTCFullYear(), hoje.getUTCMonth() + 1, hoje.getUTCDate(), hoje.getUTCHours(), hoje.getUTCMinutes(), hoje.getUTCSeconds());
	}
};
