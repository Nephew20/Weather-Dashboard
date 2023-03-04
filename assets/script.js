var apiKey = '66b2909c94017289615b9c300cb3b141'
var cityName = $('#city-input')

$(function() {
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=" + apiKey;
    fetch(weatherURL)
        .then(function(response){
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        })

    console.log('getit')
    submitCity()
})

//function submits the input of the desired city 
var submitCity = function(){
    console.log('does this work')
    
    
    // test funcitonality of code 
    $('#new-city').submit(function(event){
        event.preventDefault()
        console.log('submit works too')
    })
}

// make sure it works
