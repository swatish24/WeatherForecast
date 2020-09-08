const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key='+'your access key'+'&query='+ encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) +'&units=m'


    request({url:url, json: true}, (error, response) => {
        if (error){
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] 
                            + ". It is currently " + response.body.current.temperature 
                            + " degrees out. It feels like " + response.body.current.feelslike 
                            + " degrees out. The humidity is "+response.body.current.humidity+" percent.")
        }
    })
}

module.exports = forecast