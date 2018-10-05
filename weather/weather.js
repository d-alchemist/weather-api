// forecast.io api key bfe2065cff9b0bc0dcda578b8bd5bd5a
// https://maps.google.com/maps/api/geocode/json?address=23%20Karimu%20Kotun%20street&key=AIzaSyAGZQMgUL7i9TjRNl3z8vzL3cNPj-VkZ_Y
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