const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject)=> {

        var encodedAddress = encodeURIComponent(address);

    request({
        url: `https://maps.google.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAGZQMgUL7i9TjRNl3z8vzL3cNPj-VkZ_Y`,
        json: true
    }, (error, response, body) => {
        if (error) {
            reject('Unable to connect to google API servers');
        } else if (body.status === 'ZERO_RESULTS') {
            reject('Unable to find that address');
        } else if (body.status === 'OK') {
            resolve({
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
    })
}

geocodeAddress('40001').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
})