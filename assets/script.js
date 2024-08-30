var apiKey = '66b2909c94017289615b9c300cb3b141'
//     // var cityInputEl = $('#city-input')
// 
// // var cityinfoEl = $("#city-info")
// var currentDateEl = $('#current-date')
// var currentPicEl = $('#current-pic')
// var searchBtnEl = $('#search-btn')
// var weatherPicEl = $('#weather-pic')
// var weatherInfoEl = $('#weather-info')
// var cityNameEl = $('#city-name')
// var tempEl = $('#temp')
// var humidityEl = $('#humidity')
// var windSpeedEl = $('#wind-speed')
// var forecastEl = $('#forcecast')
// var currentCont = document.getElementById("card-container")

var cityInputEl = document.getElementById("city-input");
var cardCont = document.getElementById("card");
var searchBtn = document.getElementById("search-btn");
var cardEl = document.querySelector(".card")
var cardBody = document.querySelector(".card-body")


function getCity(cityInputEl) {
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

            generateForecast(data)
        })
    
    console.log("This is the weather data: " + weatherURL )
    
}

function searchCity(event) {
    event.preventDefault()
    var city = cityInputEl.value;

    console.log("The button was clicked");
    console.log(city);
    // cityFetch(response)
    getCity(city)


    console.log('submit works too')
}

searchBtn.addEventListener("click", searchCity)

function generateCurrentWeather (data) {
    //Get the Date 
    var currentDateEl = document.createElement('h3')
    currentDateEl.textContent = data.name + dayjs().format(", MMMM DD, YYYY")
    cardEl.appendChild(currentDateEl)

    //Generate Image
    var weatherIMG = document.createElement('img')
    weatherIMG.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png')
    weatherIMG.setAttribute('alt', data.weather[0].description)
    weatherIMG.setAttribute('class', 'card-img-top')

    cardEl.appendChild(weatherIMG)

    console.log(data.weather[0].description)

    //Parameters
    tempEl.append("Temp: " + data.main.temp + " F");
    humidityEl.append("Humidity: " + data.main.humidity + " %");
    windSpeedEl.append("Wind Speed: " + data.wind.speed + " mph");
    
    currentCont.append(tempEl, humidityEl, windSpeedEl)
}

function generateForecast(city) {
    console.log("Forecast Works")

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&cnt=6&appid=" + apiKey

    fetch(forecastURL)
        .then(function(response) {
            
            if (!response.ok) {
                console.log('Network Error')
            }
            response.json()
            console.log(response)
        })
        .then(function(data) {
            console.log(data)
        })

}