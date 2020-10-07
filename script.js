// Javascript will start running once HTML is done loading
$(document).ready(function(){

    // Cities that will be taken from User Input -- Search
    var cityName = "Chicago";
    // Open Weather API URL
    var queryURL = "https://cors-anywhere.herokuapp.com/"+ "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=53b6f538d72c7744df9aec607b80628c";

    // AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

    console.log(response);


    });















});