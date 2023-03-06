var apiKey = '66b2909c94017289615b9c300cb3b141'
var cityInputEl = $('#city-input')
var searchBtnEl = $('#search-button')
var weatherInfoEl = $('#weather-info')
var cityNameEl = $('city-name')
var tempEl = $('temp')
var humidityEl = $('humidity')
var windSpeedEl = $('wind-speed')
var forecastEl = $('forcecast')

$(function cityFetch(cityInputEl) {
       
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=" + apiKey
    fetch(weatherURL)
        .then(function(response){
            console.log(response)
            return response.json();
        })
        .then(function (data) {
            submitCity(data)
        })

    console.log('getit')
    
})

//function submits the input of the desired city 
var submitCity = function(){
    console.log('does this work')
    
    
    // test funcitonality of code 
    $('#search-button').submit(function(event){
        event.preventDefault()
        var response = cityInputEl.val();
        cityFetch(response)
        console.log('submit works too')
    })


}

// make sure it works
