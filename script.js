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
        }).then(function(res1){
            // Grab latitude & longitude of city, use in uv ajax call
            var lat = JSON.stringify(res1.coord.lat);
            var lon = JSON.stringify(res1.coord.lon);
            var uv;

            // Open Weather API URL for UV index
            var uvURL = "https://cors-anywhere.herokuapp.com/"+ "http://api.openweathermap.org/data/2.5/uvi?lat="+ lat +"&lon="+ lon +"&appid=53b6f538d72c7744df9aec607b80628c";

            // AJAX call for uv index
            // wait for gen AJAX call to run all the code prior to this call
            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function(res2){
                uv = $(".uv").text("UV Index: " + JSON.stringify(res2.value));
                $(".overview").append(uv);
            });


            // Take the following the temp, humid, wind from response
            // Use .text(the above) to its respectable class
            var name = $(".city-name").text(res1.name);
            var temp = $(".temp").text("Temperature: " + res1.main.temp.toFixed(1) + "\xB0F");
            var humid = $(".humid").text("Humidity: " + res1.main.humidity.toFixed(0) + "%");
            var wind = $(".wind").text("Wind Speed: " + res1.wind.speed.toFixed(1) + " MPH");
            $(".overview").prepend(name, temp, humid, wind);

            // Create a button for each city after user searches
            var newCity = $("<button>").text(res1.name);
            newCity.addClass("clear button warning city-button"); // use ".city-button" for click event later
            newCity.attr("data-city", cityName); // use data-city later
            // append button to nav
            $(".cities").append(newCity);
        

            
        });    

        // 5 day forecast doc: https://openweathermap.org/forecast5
        // Open Weather API URL for 5 day forecast
        var fiveDayURL = "https://cors-anywhere.herokuapp.com/"+ "api.openweathermap.org/data/2.5/forecast?q="+ cityName + "&units=imperial&appid=53b6f538d72c7744df9aec607b80628c";
        
        // AJAX call for five day forecast
        $.ajax({
            url: fiveDayURL,
            method: "GET"
        }).then(function(res3){
            var day = res3.list;

            function retrieveData(dayIndex){
                var dataObj = {
                    date: day[dayIndex].dt_txt.slice(0,11),
                    temperature: day[dayIndex].main.temp.toFixed(1),
                    weather: day[dayIndex].weather[0].main
                };
                return dataObj;
            };
            
            var fiveDayForecast = {
                day1: retrieveData(3),
                day2: retrieveData(11),
                day3: retrieveData(19),
                day4: retrieveData(27),
                day5: retrieveData(35)
            };
            
            $("#day1").prepend($("<h5>").text(fiveDayForecast.day1.date));
            var day1Weather = $("<p>").text(fiveDayForecast.day1.weather);
            var day1Temp = $("<p>").text(fiveDayForecast.day1.temperature + "\xB0F");
            $("#day1-sect").append(day1Weather, day1Temp);
            

        });







            // After refreshing the page, the user will still have access to the city's weather data -- localStorage
                // each localstorage setItem will have a unique name
            // clicking the button will get the user the city's weather info
        
    });












});