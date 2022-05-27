import app = require("teem");
import appsettings = require("../appsettings");

class Geolocalizacao {
	public static async obter(endereco: string): Promise<any> {
        const response = await app.request.json.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(endereco)}&key=${encodeURIComponent(appsettings.googleKey)}`);

        return response.result;
    }
}

export = Geolocalizacao;
