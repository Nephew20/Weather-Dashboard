var apiKey = '66b2909c94017289615b9c300cb3b141'
var cityInputEl = document.getElementById("city-input");
var searchBtn = document.getElementById("search-btn");
var currentCardEl = document.getElementById("current-card")
var cardTitle = document.getElementById("card-title")
var forecastTitle = document.getElementById("forecast-title")
var cardEl = document.querySelector(".card")
var cardBody = document.querySelector(".card-body")
var forecastEl = document.getElementById("forecast")
var savedSearchesEl = document.getElementById("saved-searches")


function getCity(cityInputEl) {

    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl + '&appid=' + apiKey + "&units=imperial";
    fetch(weatherURL)
        .then(function (response) {

            if (!response.ok) {
                alert("City not found. Check your spelling and try again.")
                throw new Error("City not found")
            }
            return response.json();

        })
        .then(function (data) {

            //Display the section title and card once a user searches for city
            cardTitle.style.display = "flex"
            cardEl.style.display = "flex"
            forecastTitle.style.display = "flex"
            
            //Empty the field prior to each search for a city
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
    }

    getCity(city)

}

searchBtn.addEventListener("click", searchCity)

function generateCurrentWeather(data) {
    //Get the Date 
    var currentDateEl = document.createElement('h3')
    currentDateEl.textContent = data.name + dayjs().format(", MMMM DD, YYYY")

    //Generate Image
    var weatherIMG = document.createElement('img')
    weatherIMG.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png')
    weatherIMG.setAttribute('alt', data.weather[0].description)
    weatherIMG.setAttribute('style', 'width:50%')

    //Add Date and Weather Icon
    cardEl.append(currentDateEl, weatherIMG)

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

//Generate the forecast
function generateForecast(data) {

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + apiKey + "&units=imperial"

    fetch(forecastURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {

            // Gathers data for 2pm each day
            for (i = 7; i < data.list.length; i += 8) {
                //Date
                var dateEl = document.createElement("h6")
                dateEl.textContent = dayjs(data.list[i].dt_txt).format("ddd MM/DD/YY")

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
                weatherIMG.setAttribute('style', 'width:100%')

                //Wind Speed
                var windSpeed = document.createElement("h6")
                windSpeed.textContent = "Wind Speed: " + data.list[i].wind.speed + " mph"

                //Create Cards for forecast
                var card = document.createElement("div")
                card.setAttribute("id", "forecast-card")
                card.setAttribute("style", "flex-column justify-content-center align-items-center")
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

//Returning an array of cities from local storage. 
function savedSearches(city) {

    //Returns an empty array 
    var savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];

    //If the city is not in the array, add the city and send it to local storage 
    if (!savedCities.includes(city)) {
        savedCities.push(city)
        localStorage.setItem("savedCities", JSON.stringify(savedCities));
        savedSearchButtons(city);
    }
}

//Helper function to display the searches from local storage
function loadSavedSearches() {
    var savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
    savedCities.forEach(function (city) {
        savedSearchButtons(city);
    });
}

// Creates the city buttons 
function savedSearchButtons(city) {
    var searchCityBtn = document.createElement("button");
    searchCityBtn.setAttribute("class", "btn-lg");

    searchCityBtn.textContent = city;

    searchCityBtn.addEventListener("click", function () {
        getCity(city);
    });

    savedSearchesEl.appendChild(searchCityBtn);
}

//Load the page with data from your local storage
loadSavedSearches()