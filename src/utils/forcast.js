const request = require('request');

const forcast = (lat, lon, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=b49a8d671aa10725017ccbd67138d099&units=imperial'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
           callback('You do not have access to the API, Please check our Internet connection',undefined);
        } else if (body.cod==='400') {
           callback('Unable to find locaiton, Please try with another search',undefined);
        }else {
           console.log(body.main);
           callback(undefined,'it is currently ' + (body.main.temp) + ' degree F. '+'apparent temperature is ' + (body.main.feels_like) + ' degree F. '+'The forcast = ' + body.weather[0].description+'. Humidity = '+(body.main.humidity));
        }
    })
}

module.exports=forcast