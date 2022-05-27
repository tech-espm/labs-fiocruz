function getGeocoding(endereco: string){
    const https = require('https');

        const options = {
        hostname: 'maps.googleapis.com',
        port: 443,
        path: '/maps/api/geocode/json?address=' + endereco + '&key=AIzaSyCTmwv7_m3FGtM-6rOY6C2B9YN2X4b0mvc',
        method: 'GET',
        };

        const req = https.request(options, (res: { statusCode: any; on: (arg0: string, arg1: (d: any) => void) => void; }) => {
        console.log(`statusCode: ${res.statusCode}`);

            res.on('data', d => {
                process.stdout.write(d);
            });
        });

        req.on('error', (error: any) => {
        console.error(error);
        });

    req.end();
}
