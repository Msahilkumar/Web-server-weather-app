
const request = require('request');

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibXNhaGlsa3VtYXIiLCJhIjoiY2wwa245dTU4MDN3ZDNicWRxOTg1NzhlZSJ9.PEqluYDUm2i6LmczHLrwAQ&limit=1'
    
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect Location Services, Please check your internet connection!',undefined);
        }else if(body.features.length===0){
            callback('Unable to find Location, Please try another search',undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                Location:body.features[0].place_name
            })
        }
    })
}

module.exports=geocode