 //variables where the most current temperature results will be stored
 var fTemp = '';
 var fTempH = '';
 var fTempL = '';      
 var cTemp = '';
 var cTempH = '';
 var cTempL = '';
 
 //other variables for search
 var city = {'CITY': ''};
 var currentCoords = {
             'lat': '',
             'lon': ''
         };
 
 // functions to change temperature from kelvin to fahrenheit and celsius
 function temperatureF(x) { return ((x - 273.15) * (9/5)) + 32}
 function temperatureC(x) { return x - 273.15 }

 //function to display the right information on the page
 function displayData(data) {
     console.log('displaying data');
     fTemp = Math.round(temperatureF(data.currentTemp)) + ' \u00b0F';
     fTempH = Math.round(temperatureF(data.highest)) + ' \u00b0F';
     fTempL = Math.round(temperatureF(data.lowest)) + ' \u00b0F';

     cTemp = Math.round(temperatureC(data.currentTemp)) + ' \u00b0C';
     cTempH = Math.round(temperatureC(data.highest)) + ' \u00b0C';
     cTempL = Math.round(temperatureC(data.lowest)) + ' \u00b0C';
     
     if (document.getElementById('tb').checked) {  
         console.log('displaying temperature in fahrenheit');
         T.textContent = fTemp;
         H.textContent = fTempH;
         L.textContent = fTempL;
     } else {
         console.log('displaying temperature in celsius');
         T.textContent = cTemp;
         H.textContent = cTempH;
         L.textContent = cTempL;
     }
     document.getElementById('description').textContent = data.description;
     document.getElementById('icon').src = 'http://openweathermap.org/img/w/' + data.icon + '.png';
 }

function initMap() {
    var input = document.getElementById('searchBar');
    var options = {
    types: ['(cities)'],
    //add in more country codes for autocorrect ISO_3166-1 alpha-2 codes
    componentRestrictions: {country: ["us","kr",]}
    }
    var autocomplete = new google.maps.places.Autocomplete(input, options);

    google.maps.event.addDomListener(window, 'load', initMap);
}