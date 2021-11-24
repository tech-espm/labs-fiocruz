import app = require("teem");
import appsettings = require("../appsettings");
import nodemailer = require("nodemailer");
import SMTPTransport = require("nodemailer/lib/smtp-transport");

interface OpcoesEmail {
	from?: string;
	to: string;
	subject: string;
	text?: string;
	html?: string;
}

class Email {
	public static async enviar(info: OpcoesEmail): Promise<SMTPTransport.SentMessageInfo> {
		if (!info.from)
			info.from = appsettings.mailFromGeral;

		const transporter = nodemailer.createTransport(appsettings.mailConfig);

		return transporter.sendMail(info);
	}
}

export = Email;
