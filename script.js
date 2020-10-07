// Javascript will start running once HTML is done loading
$(document).ready(function(){

//Declaring global variables
    // Cities that will be taken from User Input -- Search
    var cityName = "Chicago"; // chicago placed as placeholder to confirm ajax call works

    // userInput from search after clicking the search button will be cityName
    var userInput; // will be defined in click event

    // PSEUDO CODE
        // When user clicks search button
        $("#search-button").on("click", () => {
            // 1. take value of input search and assign it to userInput
            userInput = $("#search").val().trim().toLowerCase();
            console.log(userInput);
                // if value is "" don't do anything
                // else run the following
            // 2. assign userInput to cityName
        });
        
    // Open Weather API URL
    var queryURL = "https://cors-anywhere.herokuapp.com/"+ "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=53b6f538d72c7744df9aec607b80628c";

    // AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        // console.log(response);

        // PSEUDO CODE
        // Take the following:
        //     1. temp -> response.main.temp
        //     2. humidity -> response.main.humidity
        //     3. wind -> response.wind.speed
        // Use .text(the above) to its respectable class

        
        
        
    });















});