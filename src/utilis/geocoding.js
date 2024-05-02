const request = require('postman-request');


const geocoding = (address, callback) =>{
    const urlRes = `https://us1.locationiq.com/v1/search?key=pk.7c998dcb0beb99c80167c639b6a1fff8&q=${encodeURIComponent(address)}&format=json`;
    
    request({url: urlRes, json:true}, ( error, response ) =>{
        if(error){
            callback('unable to connect to location services', undefined)
        }else if (!response.body ){
            callback('Unable to find location please try and find another search', undefined)
        }
        else{
            const latitude = response.body[0].lat;
            const longitude = response.body[0].lon;
            callback(undefined, { latitude, longitude} )
            
        }
    })

}

module.exports = geocoding


// const url = `http://api.weatherapi.com/v1/current.json?key=d8f1a6a1baed4b3e868203258232208&q=${encodeURIComponent(address)}`;
    // const urlOpenCage = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=7a65677674f54e8196e66d217c1512ab`

// const result = response.body.results[0];
            // if(!result.annotation || !result.annotation.DMS){
            //     callback('Location is not available for this service')
            // }else{
            //     const latitude = result.annotations.DMS.lat;
            //     const longitude = result.annotations.DMS.lng;
            //     callback(undefined, { latitude, longitude})
            // }
            //     // location: response.body.location.region
            


// geocoding('Jos', (error, data)=>{
//     console.log('Error,', error);
//     console.log('Data', data)
// })























// const geocoding = (address, callback) =>{
//     const urlRes = `https://us1.locationiq.com/v1/search?key=pk.7c998dcb0beb99c80167c639b6a1fff8&q=${encodeURIComponent(address)}&format=json`;
//     request({url: urlRes, json:true}, ( error, response ) =>{
//         if(error){
//             callback('unable to connect to location services', undefined)
//         }else if (!response.body.boundingbox){
//             callback('Unable to find location please try and find another search', undefined)
//         }
//         else{
//             callback(undefined,{
//                 latitude: response.body[0].lat,
//                 longitude: response.body[0].lon,
//                 location: response.body[0].display_name
//             })
//         }
//     })

// }
