var apiKey = '66b2909c94017289615b9c300cb3b141'
    // var cityInputEl = $('#city-input')
var cityInputEl = document.getElementById("city-input");
// var cityinfoEl = $("#city-info")
var currentDateEl = $('#current-date')
var currentPicEl = $('#current-pic')
var searchBtnEl = $('#search-button')
var weatherPicEl = $('#weather-pic')
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
            
            generateCurrentWeather(data)
        })
    
    console.log("This is the weather data: " + weatherURL )
    
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

function generateCurrentWeather (data) {
    //Get the Date 
    currentDateEl.append(data.name + dayjs().format(", MMMM DD, YYYY"))

    //Generate Image
    // weatherIMG = document.createElement('img')
    currentPicEl.attr('src', 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png')
    currentPicEl.attr('alt', data.weather[0].description)
    // weatherIMG.setAttribute('class', 'card-img-top')
    // weatherPicEl.append(weatherIMG)
    
    console.log(data.weather[0].description)

    //Parameters
    tempEl.append("Temp: " + data.main.temp + " F");
    humidityEl.append("Humidity: " + data.main.humidity + " %");
    windSpeedEl.append("Wind Speed: " + data.wind.speed + " mph");
}
