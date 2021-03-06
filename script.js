// Javascript will start running once HTML is done loading
$(document).ready(function(){

//Declaring global variables
    // Cities that will be taken from User Input -- Search
    var cityName; // will be assigned the value of userInput
  
    // Declare empty array for all cities
    var cities = [];

    function init() {
        var get = JSON.parse(localStorage.getItem("weather-dash"));
        if (get !== null) {
            for (var i=0; i<get.length; i++) {
                var storedCityName = get[i][0];
                renderWeather(storedCityName);
            }
        }
        else {
            $(".five-day-forecast").hide();
        }
        
    };

    init();

    // When user clicks search button
    $("#search-button").on("click", renderWeather);
    
    function renderWeather(inputName) {
        
        // 1. take value of input search and assign it to userInput
        var userInput = $("#search").val().trim();
        // if value is not "" assign userInput to cityName
        if (userInput !== "") {
            inputName = userInput;
        }       

        cityName = inputName;
        // Declaring empty array for cities' weather data
        var cityArr = [];

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
            var cityBtnName = res1.name;
            var uv;

            // Open Weather API URL for UV index
            var uvURL = "https://cors-anywhere.herokuapp.com/"+ "http://api.openweathermap.org/data/2.5/uvi?lat="+ lat +"&lon="+ lon +"&appid=53b6f538d72c7744df9aec607b80628c";

            // AJAX call for uv index
            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function(res2){
                // function renderUV() {
                    uv = "UV Index: " + JSON.stringify(res2.value);
                    var uvText = $(".uv").text(uv)
                    $(".overview").append(uvText);
                // };
                // renderUV();
            });

            // Take the following the temp, humid, wind from response
            // Place weather data + uv from uv call in an object
            var weatherData = {
                name : res1.name,
                temp : "Temperature: " + res1.main.temp.toFixed(1) + "\xB0F",
                humid : "Humidity: " + res1.main.humidity.toFixed(0) + "%",
                wind : "Wind Speed: " + res1.wind.speed.toFixed(1) + " MPH",
                uv : uv,
            };
            
            // Use .text(the above) to its respectable class in function
            function renderOverview() {
                var nameText = $(".city-name").text(weatherData.name);
                var tempText = $(".temp").text(weatherData.temp);
                var humidText = $(".humid").text(weatherData.humid);
                var windText = $(".wind").text(weatherData.wind);
                $(".overview").prepend(nameText, tempText, humidText, windText);
            };

            function renderBtn() {
                // Create a button for each city after user searches
                var newCity = $("<button>").text(cityBtnName);
                newCity.addClass("clear button secondary city-button"); // use ".city-button" for click event later
                newCity.attr("data-city", cityName); // use data-city later
                // append button to nav
                $(".cities").append(newCity);
            };
            
            // add if/else conditional to only create one button per city
            renderBtn();
            // Call function to render overview weather data
            renderOverview();

            cityArr.push(cityBtnName);
            cityArr.push(weatherData);
            
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
                    temperature: day[dayIndex].main.temp.toFixed(1) + "\xB0F",
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
            
            // pass "#day_", "day_" as arguments when calling
            function display(dayId, dayNum){
                $(dayId).empty();
                $(dayId).prepend($("<h5>").text(fiveDayForecast[dayNum].date));
                var dayWeather = $("<p>").text(fiveDayForecast[dayNum].weather);
                var dayTemp = $("<p>").text(fiveDayForecast[dayNum].temperature);
                var sect = $("<div>").addClass("card-section");
                sect.append(dayWeather, dayTemp);
                $(dayId).append(sect);
            };

            function renderForecast() {
                $(".five-day-forecast").show();
                display("#day1", "day1");
                display("#day2", "day2");
                display("#day3", "day3");
                display("#day4", "day4");
                display("#day5", "day5");
            };

            // Call function to display forecast data on page
            renderForecast();

            cityArr.push(fiveDayForecast);
            cities.push(cityArr);

            // After refreshing the page, the user will still have access to the cities' weather data -- localStorage
            localStorage.setItem("weather-dash", JSON.stringify(cities));


        });
        
         // clicking the button will get the user the city's weather info



    };
    

    





     







});