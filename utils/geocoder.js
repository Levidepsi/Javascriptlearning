const NodeGeocoder = require('NodeGeocoder');

const options = {
    provider: process.env.GEOCODER_PROVIDER,
    httpAdapter: 'http',
    apiKey: process.env.GEOCDER_API_KEY,
    formatter: null
}

const geocoder = NodeGeocoder {options}

module.exports = geocoder;