// Javascript will start running once HTML is done loading
$(document).ready(function(){

//Declaring global variables
    // Cities that will be taken from User Input -- Search
    var cityName; // will be assigned the value of userInput
  
    // When user clicks search button
    $("#search-button").on("click", () => {
        // 1. take value of input search and assign it to userInput
        var userInput = $("#search").val().trim();
        // if value is "" don't do anything
        if (userInput === "") {
            alert("Please input a city name");
        }       
        // else assign userInput to cityName
        else {
            cityName = userInput;
        }

        // Open Weather API URL for general weather data
        var genURL = "https://cors-anywhere.herokuapp.com/"+ "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=53b6f538d72c7744df9aec607b80628c";
    
        // AJAX call for current city weather
        $.ajax({
            url: genURL,
            method: "GET"
        }).then(function(response){
            // Take the following the temp, humid, wind from response
            // Use .text(the above) to its respectable class
            var name = $(".city-name").text(response.name);
            var temp = $(".temp").text("Temperature: " + response.main.temp.toFixed(1) + "\xB0F");
            var humid = $(".humid").text("Humidity: " + response.main.humidity.toFixed(0) + "%");
            var wind = $(".wind").text("Wind Speed: " + response.wind.speed.toFixed(1) + " MPH");
            $(".overview").append(name, temp, humid, wind);

            // Grab latitude & longitude of city, use in uv ajax call
            var lat = JSON.stringify(response.coord.lat);
            var lon = JSON.stringify(response.coord.lon);

            // Create a button for each city after user searches
            var newCity = $("<button>").text(response.name);
            newCity.addClass("clear button warning city-button"); // use ".city-button" for click event later
            newCity.attr("data-city", cityName); // use data-city later
            // append button to nav
            $(".cities").append(newCity);
        

            // Open Weather API URL for UV index
            var uvURL = "https://cors-anywhere.herokuapp.com/"+ "http://api.openweathermap.org/data/2.5/uvi?lat="+ lat +"&lon="+ lon +"&appid=53b6f538d72c7744df9aec607b80628c";

            // console.log(uvURL);

            // After refreshing the page, the user will still have access to the city's weather data -- localStorage
                // each localstorage setItem will have a unique name
            // clicking the button will get the user the city's weather info
        });
    });












});