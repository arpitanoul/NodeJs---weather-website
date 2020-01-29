const request = require('request')
/*
const url = 'https://api.darksky.net/forecast/1194356a92ff90319c2d07e0e673cfdb/37.8267,-122.4233?units=si'

request({ url: url, json: true}, (error, response) => {
    if(error){
        console.log('Unable to connect to weather service!')
    }
    else if(response.body.error){
        console.log('Unable to find location!')
    }
    else{
        console.log(response.body.daily.data[0].summary +' It is currently ' +response.body.currently.temperature +' degrees out. There is a ' +response.body.currently.precipProbability +'% chance of rain.')
    }
})
*/

//  Reusable Code
const forecast = (lat, long, callback) => {
    
    const url = 'https://api.darksky.net/forecast/1194356a92ff90319c2d07e0e673cfdb/' +encodeURIComponent(lat) +',' +encodeURIComponent(long) +'?units=si'
    
    request({url, json:true }, (error, {body}) =>{
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }
        else if(body.error){
            callback('Unable to find location. Try another search.', undefined)
        }
        else{
            callback(undefined, body.daily.data[0].summary +' It is currently ' +body.currently.temperature +' degrees out. The high today is ' +body.daily.data[0].temperatureHigh +' with a low of ' +body.daily.data[0].temperatureLow +'. There is a ' +body.currently.precipProbability +'% chance of rain.')
        }
    })
}

module.exports = forecast