var apiKey = '66b2909c94017289615b9c300cb3b141'
    // var cityInputEl = $('#city-input')
var cityInputEl = document.getElementById("city-input");
var searchBtnEl = $('#search-button')
var weatherInfoEl = $('#weather-info')
var cityNameEl = $('#city-name')
var tempEl = $('#temp')
var humidityEl = $('#humidity')
var windSpeedEl = $('#wind-speed')
var forecastEl = $('#forcecast')

function cityFetch(cityInputEl) {
    console.log("The city should be ", cityInputEl);

    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl + '&appid=' + apiKey + "&units=imperial";
    fetch(weatherURL)
        .then(function(response) {
            console.log(response)
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            // submitCity(data)
            generateWeather(data)
        })
    
    
}

$('#search-button').click(function(event) {
    event.preventDefault()
        // var response = cityInputEl.value;
    var city = cityInputEl.value;

    console.log("The button was clicked");
    console.log(city);
    // cityFetch(response)
    cityFetch(city)


    console.log('submit works too')
})

function generateWeather (data) {
    //Get the Date 
    cityNameEl.append(data.name + dayjs().format(" MMMM DD, YYYY"))

    //Generate Image
    weatherIMG = document.createElement('img')
    weatherIMG.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png')
    weatherIMG.setAttribute('alt', data.weather.description)

    cityNameEl.append(weatherIMG)
    //Parameters
    tempEl.append("Temp: " + data.main.temp + " F");
    humidityEl.append("Humidity: " + data.main.humidity + " %");
    windSpeedEl.append("Wind Speed: " + data.wind.speed + " mph");
}
