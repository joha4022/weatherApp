const { response } = require('express');
const express = require('express');
const app = express();
const path = require('path');
const https = require('https');
require ('dotenv').config();
const api_key = process.env.API_KEY;
const google_api_key = process.env.GOOGLE_API_KEY;

var finalData = '';

app.listen(3000, () => console.log('listening at 3000, have fun!'));
app.use(express.static('app'));
app.use(express.json({limit: '100mb'}));

app.get('/weatherApp.js', (request, response) => {
    response.sendFile(path.join(__dirname + '/weatherApp.js'))
});

app.post('/currentCitySearch', (request, response) => {

    console.log('requesting weather for current location');
    console.log('lat is ' + request.body.lat + 'and lon is ' + request.body.lon);
   
    https.get('https://api.openweathermap.org/data/2.5/weather?lat=' + request.body.lat + '&lon=' + request.body.lon + '&appid=' + api_key, (response) => {
      
        response.on('data', (chunk) => {
            data = chunk;
        });
        response.on('end', () => {
            console.log('weather information received');
            //console.log(JSON.parse(data));
            var weatherInfo = JSON.parse(data)
            //console.log(weatherInfo)
            finalData = {
            status: 'success',
            location: weatherInfo.name,
            currentTemp: weatherInfo.main.temp,
            highest: weatherInfo.main.temp_max,
            lowest: weatherInfo.main.temp_min,
            description: weatherInfo.weather[0].description,
            icon: weatherInfo.weather[0].icon
            };
            //console.log(finalData);
        });
    })
    setTimeout(function() {
        console.log(finalData);
        response.json(finalData);
    }, 1000);
    
});

app.post('/citySearch', (request, response) => {
    
    console.log('requesting weather for ' + '[' + request.body.CITY + ']');
   
    https.get('https://api.openweathermap.org/data/2.5/weather?q=' + request.body.CITY + '&appid=' + api_key, (response) => {
    
        response.on('data', (chunk) => {
            data = chunk;
        });

        response.on('end', () => {
            console.log('weather information received');
            //console.log(JSON.parse(data));
            var weatherInfo = JSON.parse(data)
            //console.log(weatherInfo)
            if(weatherInfo.message=="city not found") {
                finalData= {
                    errorMessage: "city not found"
                }
            } else {
                finalData = {
                    status: 'success',
                    location: weatherInfo.name,
                    currentTemp: weatherInfo.main.temp,
                    highest: weatherInfo.main.temp_max,
                    lowest: weatherInfo.main.temp_min,
                    description: weatherInfo.weather[0].description,
                    icon: weatherInfo.weather[0].icon
                };
            }
            //console.log(finalData);
        });
    })

    setTimeout(function() {
        console.log(finalData);
        response.json(finalData);
    }, 1000);
    
});