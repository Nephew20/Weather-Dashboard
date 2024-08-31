var apiKey = '66b2909c94017289615b9c300cb3b141'
var cityInputEl = document.getElementById("city-input");
var cardCont = document.getElementById("card");
var searchBtn = document.getElementById("search-btn");
var cardEl = document.querySelector(".card")
var cardBody = document.querySelector(".card-body")
var forecastEl = document.getElementById("forecast")


function getCity(cityInputEl) {
    console.log("The city should be ", cityInputEl);

    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl + '&appid=' + apiKey + "&units=imperial";
    fetch(weatherURL)
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (data) {
            console.log("city", data)

            generateCurrentWeather(data)

            generateForecast(data)
        })

    console.log("This is the weather data: " + weatherURL)

}

function searchCity(event) {
    event.preventDefault()
    var city = cityInputEl.value;

    console.log("The button was clicked");
    console.log(city);

    getCity(city)


    console.log('submit works too')
}

searchBtn.addEventListener("click", searchCity)

function generateCurrentWeather(data) {
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

    //Weather Conditions
    var temp = document.createElement('p')
    temp.textContent = "Temp: " + data.main.temp + " F"

    var humidity = document.createElement('p')
    humidity.textContent = "Humidity: " + data.main.humidity + " %"

    var windSpeed = document.createElement('p')
    windSpeed.textContent = "Wind Speed: " + data.wind.speed + " mph"

    //Add Elements to the Card
    cardBody.append(temp, humidity, windSpeed)
    cardEl.appendChild(cardBody)
}

function generateForecast(data) {
    console.log("Forecast Works")

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + apiKey + "&units=imperial"
    console.log("forecast city", cityInputEl)
    fetch(forecastURL)
        .then(function (response) {

            if (!response.ok) {
                console.log('Network Error')
            }
            console.log(response)
            return response.json()

        })
        .then(function (data) {
            console.log("forecast", data)
            console.log(data.list.length)

            for (i = 9; i < data.list.length; i += 8) {
                //Date
                var dateEl = document.createElement("h6")
                dateEl.textContent = data.list[i].dt_txt

                //Temp
                var temp = document.createElement("h6")
                temp.textContent = data.list[i].main.temp + " F"

                //Humidity
                var humidity = document.createElement("h6")
                humidity.textContent = data.list[i].main.humidity + " %"

                //Weather Image
                var weatherIMG = document.createElement('img')
                weatherIMG.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.list[1].weather[0].icon + '@2x.png')
                weatherIMG.setAttribute('alt', data.list[i].weather[0].description)
                weatherIMG.setAttribute('class', 'card-img-top')
                
                //Wind Speed
                var windSpeed = document.createElement("h6")
                windSpeed.textContent = data.list[i].wind.speed + " mph"

                forecastEl.append(dateEl, weatherIMG, temp, windSpeed, humidity)
            }


        })

}