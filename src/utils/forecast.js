const request = require('request');
const { hasUncaughtExceptionCaptureCallback } = require('process');


const forecast = (latitude, longitude, callback) => {

    //longitude first, latitude second
    const url = `http://api.weatherstack.com/current?access_key=d428228c2f17a749f189d54a18b49152&query=${encodeURIComponent(longitude)},${encodeURIComponent(latitude)}&units=f`

    request({url, json: true}, (error, {body}) => {

        if(error){
            callback('Unable to connect to location services', undefined);
        }else if(body.error){
            console.log('Unable to connect to weather service', undefined);
        }else if(body.type == 'missing_query'){
            console.log('Error, Missing query');
        }else{

            callback(undefined, `${body.current.weather_descriptions}. It is currently ${body.current.temperature} degrees in ${body.location.region}. There is a ${body.current.precip}% chance of rain`)
            
        }
    })


}

module.exports = forecast
