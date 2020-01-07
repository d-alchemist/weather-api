const request = require('request');

getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/bfe2065cff9b0bc0dcda578b8bd5bd5a/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                location: body.timezone,
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });    
        } else {
            callback('unable to fetch weather.')        
        }
    });  
};

module.exports.getWeather = getWeather;
