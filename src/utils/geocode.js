const request = require('request')

//  Geocoding
//  Address -> Lat/Long -> Weather

//  Print the lat/long for Los Angeles 
/*
const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYW5vdWxtb2dpbGV0ZWNoIiwiYSI6ImNrNXBwc2xjZjF5cnYzZHBsbXQydnY2c3MifQ.HGyjahhRMVVGXgPCjM4WNQ&limit=1'

request({ url: geoURL, json: true}, (error, response) => {
    if(error){
        console.log('Unable to connect to weather service!')
    }
    else if(response.body.features.length === 0){
        console.log('Unable to find location!')
    }
    else{
        const lat = response.body.features[0].center[1]
        const long = response.body.features[0].center[0]
        console.log(lat, long)
    }
})
*/

//  Reusable Code
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYW5vdWxtb2dpbGV0ZWNoIiwiYSI6ImNrNXBwc2xjZjF5cnYzZHBsbXQydnY2c3MifQ.HGyjahhRMVVGXgPCjM4WNQ&limit=1'

    request({url, json:true }, (error, {body}) =>{
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode