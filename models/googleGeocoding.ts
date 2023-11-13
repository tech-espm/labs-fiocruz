import app = require("teem");
import appsettings = require("../appsettings");

class Geolocalizacao {
	public static async obter(endereco: string): Promise<any> {
        const response = await app.request.json.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(endereco)}&key=${encodeURIComponent(appsettings.googleKey)}`);

        return response.result;
    }

	public static async obterCep(cep: string): Promise<any> {
        const response = await app.request.json.get(`https://viacep.com.br/ws/${encodeURIComponent(cep)}/json/`);

		if (!response.success)
			throw new Error("Erro na comunicação com o servidor de busca de CEP");

		return response.result;
    }
}

export = Geolocalizacao;
