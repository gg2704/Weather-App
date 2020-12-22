//console log
$(document).ready(function() {
    $("#searchBtn").on("click", function(event) {
        searchWeather();
        var cityName = $("#city").val().trim();
        var APIkey = "e79821cd9217952538f65afeef970c88";
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey;
        $.ajax({
            url:queryURL,
            method: "GET",
        }).then(function(response) {
           console.log(response);
        });
        function init() {
            var storedCities = JSON.parse(localStorage.getItem("cityBtn"));
            if (storedCities !== null) {
                cities = storedCities;
            }
            renderButtons(cities);
          }
//Current weather
        function searchWeather() {
            $("#currentWeatherHeading").empty();
            $("#currentWeatherP").empty();
            var cityName = $("#city").val().trim();
//My API key
            var APIkey = "e79821cd9217952538f65afeef970c88";
            var queryURLCurrentWeather = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey;
            event.preventDefault();
            $.ajax({
                url: queryURLCurrentWeather,
                method: "GET",
                dataType: "json",
            }).then(function(response) {
//Display with icon and data on weather
                var date = new Date()
                var displayIcon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
                var fahrenheit = (response.main.temp) * (9/5) - 459.67;
                var displayTemp = $("<p>").text("Temperature: " + fahrenheit.toFixed(2) + " ^F")
                var displayHumidity = $("<p>").text("Humidity: " + response.main.humidity + " %")
                var displayWindSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + " MPH")
                var uvIndex = (100 - response.clouds.all) / 10
                var displayUVIndex = $("<p>").text("UV Index: " + uvIndex)

                $("#currentWeatherHeading").append(response.name + "  (");
                $("#currentWeatherHeading").append(date.toDateString() + ")");
                $("#currentWeatherHeading").append(displayIcon);
                $("#currentWeatherP").append(displayTemp);
                $("#currentWeatherP").append(displayHumidity);
                $("#currentWeatherP").append(displayWindSpeed);
                $("#currentWeatherP").append(displayUVIndex);
                $("#currentWeatherDiv").addClass('currentWeatherDivCreated')
            });
            fiveDayForecast()
        };
//Five
        function fiveDayForecast() {
            var cityName = $("#city").val().trim();
            var APIkey = "e79821cd9217952538f65afeef970c88";
            var queryURLFiveDayForecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIkey;
            event.preventDefault();
            $.ajax({
                url: queryURLFiveDayForecast,
                method: "GET",
                dataType: "json",
            }).then(function(response) {
                $("#5DayForecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");
                for (var i = 0; i < response.list.length; i++) {
                    if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                        var displayIcon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                        var fahrenheit = (response.list[i].main.temp) * (9/5) - 459.67;
                        var displayTemp = $("<p>").text("Temp: " + fahrenheit.toFixed(2) + " ^F");
                        var displayHumidity = $("<p>").text("Humidity: " + response.list[i].main.humidity + " %");
                        var displayDateTime = response.list[i].dt_txt.split(" ");
                        var displayDate = $("<p>").text(displayDateTime[0]);

                        var col = $("<div>").addClass("col-sm-2")
                        var card = $("<div>").addClass("card")
                        var body = $("<div>").addClass("card-body")

                        col.append(card.append(body.append(displayDate, displayIcon, displayTemp, displayHumidity)));
                        $("#5DayForecast .row").append(col)
                    }
                }
            });
        }
    });
});