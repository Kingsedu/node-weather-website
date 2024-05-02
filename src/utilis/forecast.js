const request = require('postman-request')
const forecast = (latitude, longitude, callback) =>{
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b6d44e253afb80c1f622eed1b51db91e`;
    request({url, json:true}, (error, { body })=>{
        if(error){
            callback('unable to connect to the server', undefined)
        }else if(!body){
            callback('unable to connect to the openWeather', undefined)
        }else{
            const temp = body.main.temp;
            const pressure = body.main.pressure;
            const humidity = body.main.humidity;
            const des = body.weather[0].description;

            callback(undefined, { temp, humidity, pressure, des })
        }
    })
}

module.exports = forecast;




//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before);
// const forecast = (latitude, longitude, callback) =>{
//     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b6d44e253afb80c1f622eed1b51db91e`;
//     request({url, json:true}, (error, data)=>{
//         if(error){
//             callback('unable to connect to the server', undefined)
//         }else if(!data){
//              callback('unable to connect to the openWeather', undefined)
//         }else{
//             console.log(data.body.main.temp)
//             console.log(data.body.main.pressure)
//             console.log(data.body.main.humidity)
//             console.log(data.body.weather[0].description)

//         }

//     })
// }






