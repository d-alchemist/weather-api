const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

var argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv

geocode.geocodeAddress(argv.address, (errorMessage, result) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(result.address);
        weather.getWeather(result.latitude,result.longitude, (errorMessage, weatherResult) =>{
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`it's currently ${weatherResult.temperature} but it feels like ${weatherResult.apparentTemperature}`)
            }
        });
    }
});


