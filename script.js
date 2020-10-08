// Javascript will start running once HTML is done loading
$(document).ready(function(){

//Declaring global variables
    // Cities that will be taken from User Input -- Search
    var cityName; // will be assigned the value of userInput

    // PSEUDO CODE
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
        // Open Weather API URL
        var genURL = "https://cors-anywhere.herokuapp.com/"+ "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=53b6f538d72c7744df9aec607b80628c";
    
        // AJAX call
        $.ajax({
            url: genURL,
            method: "GET"
        }).then(function(response){
            // PSEUDO CODE
            // Take the following:
            //     1. temp -> response.main.temp
            //     2. humidity -> response.main.humidity
            //     3. wind -> response.wind.speed
            // Use .text(the above) to its respectable class
            var temp = $(".temp").text("Temperature: " + response.main.temp.toFixed(1) + "\xB0F");
            var humid = $(".humid").text("Humidity: " + response.main.humidity.toFixed(0) + "%");
            var wind = $(".wind").text("Wind Speed: " + response.wind.speed.toFixed(1) + " MPH");
            $(".overview").append(temp, humid, wind);
        });

        // PSEUDO CODE
        // Create a button for each city after user searches
        var newCity = $("<button>").text(cityName);
        newCity.addClass("clear button warning city-button"); // add click event on ".city-button"
        newCity.attr("data-city", cityName);
        // append button to nav
        $(".cities").append(newCity);
        // After refreshing the page, the user will still have access to the city's weather data -- localStorage
            // each localstorage setItem will have a unique name
        // clicking the button will get the user the city's weather info
    });












});