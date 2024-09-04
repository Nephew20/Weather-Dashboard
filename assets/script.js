var apiKey = '66b2909c94017289615b9c300cb3b141'
var cityInputEl = document.getElementById("city-input");
var searchBtn = document.getElementById("search-btn");
var currentCardEl = document.getElementById("current-card")
var cardEl = document.querySelector(".card")
var cardBody = document.querySelector(".card-body")
var forecastEl = document.getElementById("forecast")
var savedSearchesEl = document.getElementById("saved-searches")


function getCity(cityInputEl) {

    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl + '&appid=' + apiKey + "&units=imperial";
    fetch(weatherURL)
        .then(function (response) {
            console.log(response)

            if (!response.ok) (
                alert("Please select a valid city")
            )
            return response.json();

        })
        .then(function (data) {
            console.log("city", data)

            currentCardEl.innerHTML = ''
            cardEl.innerHTML = ''
            cardBody.innerHTML = ''
            forecastEl.innerHTML = ''
            generateCurrentWeather(data)

            generateForecast(data)

            savedSearches(data.name)
        })

    console.log("This is the weather data: " + weatherURL)

}

function searchCity(event) {
    event.preventDefault()
    var city = cityInputEl.value;

    if (city === "") {
        alert("Please enter a valid city")
        return
    } else if (city === "undefined") {
        alert("Check your spelling for the city")
        return
    }

    getCity(city)

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
    currentCardEl.appendChild(cardEl)
}

function generateForecast(data) {

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


            for (i = 5; i < data.list.length; i += 8) {
                //Date
                var dateEl = document.createElement("h6")
                dateEl.textContent = dayjs(data.list[i].dt_txt).format("MM/DD/YY ddd hh:mm")

                //Temp
                var temp = document.createElement("h6")
                temp.textContent = "Temp: " + Math.round(data.list[i].main.temp) + " F"

                //Humidity
                var humidity = document.createElement("h6")
                humidity.textContent = "Humidity: " + data.list[i].main.humidity + " %"

                //Weather Image
                var weatherIMG = document.createElement('img')
                weatherIMG.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.list[1].weather[0].icon + '@2x.png')
                weatherIMG.setAttribute('alt', data.list[i].weather[0].description)
                weatherIMG.setAttribute('class', 'card-img-top')

                //Wind Speed
                var windSpeed = document.createElement("h6")
                windSpeed.textContent = "Wind Speed: " + data.list[i].wind.speed + " mph"

                //Create Cards for forecast
                var card = document.createElement("div")
                card.setAttribute("class", "card")
                card.setAttribute("style", "width: 18rem;")
                card.appendChild(weatherIMG)

                var cardBody = document.createElement("div")
                cardBody.setAttribute("class", "card-body")
                cardBody.append(dateEl, temp, windSpeed, humidity)

                card.appendChild(cardBody)

                forecastEl.append(card)
                forecastEl.setAttribute("class", "d-flex")
            }


        })

}

function savedSearches(city) {
    var savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
    if (!savedCities.includes(city)) {
        savedCities.push(city);
        localStorage.setItem("savedCities", JSON.stringify(savedCities));
        savedSearchButtons(city);
    }
}

function loadSavedSearches() {
    var savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
    savedCities.forEach(function (city) {
        savedSearchButtons(city);
    });
}

function savedSearchButtons(city) {
    var searchCityBtn = document.createElement("button");
    searchCityBtn.setAttribute("class", "btn-lg");

    searchCityBtn.textContent = city;

    searchCityBtn.addEventListener("click", function () {
        getCity(city);
    });

    savedSearchesEl.appendChild(searchCityBtn);
}

loadSavedSearches()