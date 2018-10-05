const yargs = require('yargs');
const axios = require('axios');

var argv = yargs
    .options({
        a: {
            // demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true,
            default: "nike lake"
        }
    })
    .help()
    .alias('help', 'h')
    .argv

encodedAddress = encodeURIComponent(argv.address);     
var geocodeUrl= `https://maps.google.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAGZQMgUL7i9TjRNl3z8vzL3cNPj-VkZ_Y`;
axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to verify address given');
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/bfe2065cff9b0bc0dcda578b8bd5bd5a/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl)
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    var summary = response.data.currently.summary;
    var icon = response.data.currently.icon
    console.log(`The weather is ${temperature} but it feels like ${apparentTemperature}`);
    console.log(`It is ${summary} and ${icon} outside`);
}).catch((error) => {
    if(error.code === 'ECONNREFUSED') {
        console.log('Unable to establish a connection to the google API');        
    } else if (error.code === 'ENOTFOUND') {
        console.log('Unable to establish a connection to the weather API');
    } else {
        console.log(error.message);
    }
})