// Declare global Variables
var stateInput;
var activityInput;
var darkMode = false;
//APIs, API keys,CORS proxy 
var npsAPIkey = config.NPS_API;
var npsQueryURL =
    "https://developer.nps.gov/api/v1/parks?q=&api_key=" + npsAPIkey;
var weatherapiKey = config.OWM_API;
var weatherqueryURL =
    "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=" +
    weatherapiKey;
var corsVar = "https://chriscastle.com/proxy/index.php?:proxy:";

//On click for the sumbit button
$("#submit").on("click", function (e) {
    e.preventDefault();

    stateInput = $("#selectedState").val();
    activityInput = $("#selectedActivity").val();

    $("#activities").empty();
    $("#quote").empty();

    getQuote();
    getParkInfo(stateInput, activityInput);
});

//Reset button onclick function
$("#reset").on("click", function (e) {
    e.preventDefault();
    $("#activities").empty();
    $("#quote").empty();
    $("#selectedState").val("State");
    $("#selectedActivity").val("Select Activity");
});

//Dark and light mode event
$('#modeSwitch').on('click', function () {
    if (darkMode === false) {
        $('#theme').attr('href', 'assets/styles/nightStyle.css');
        $(this).attr({ src: "./assets/images/baseline_lightbulb_white_18dp.png", alt: "light mode", value: "light" });
        darkMode = true;
        return;
    }
    $('#theme').attr('href', 'assets/styles/style.css');
    $(this).attr({ src: "./assets/images/baseline_lightbulb_black_18dp.png", alt: "dark mode", value: "dark" });
    darkMode = false;
    return;
});

//Function to get National Park information and push to the page
function getParkInfo(stateInput, activityInput) {
    npsQueryURL =
        "https://developer.nps.gov/api/v1/parks?stateCode=" +
        stateInput +
        "&q=" +
        activityInput +
        "&api_key=" +
        npsAPIkey;

    $.ajax({
        url: npsQueryURL,
        method: "GET",
        success: function (response) {
            var result = response.data;
            var noResults = $('<p>').attr('id', 'noResults');
            noResults.html("RESULTS NOT FOUND");
            if (result.length === 0) {
                $("#activities").append(noResults);
            } else {
                for (var a = 0; a < result.length; a++) {
                    var parkDiv = $("<div>").attr({ class: "card", id: "card-" + a });
                    var parkName = $("<h4>").attr("class", "cardTitle");
                    var parkImg = $("<p>").attr("class", "cardImg");
                    var img = $("<img>");
                    var parkDescription = $("<p>").attr("class", "cardDetails");
                    var urlButton = $("<button>").attr({type: "button", class: "btn btn-info" });
                    // var parkURL = $("<a>").attr("href", result[a].url);
                    var parkLat = result[a].latitude;
                    var parkLon = result[a].longitude;
                    var parkDirections = $("<span>").attr("class", "cardDetails");
                    var parkWeatherInfo = $("<span>").attr("class", "cardDetails");
                    var parkContactHeader = $('<p>').attr('class', 'cardSectionHeader');
                    var parkPhone = $('<span>').attr('class', 'cardDetails');
                    var parkEmail = $('<span>').attr('class', 'cardDetails');

                    parkName.html("<br>" + result[a].fullName);
                    img.attr({ src: result[a].images[0].url, class: "parkImg" });
                    parkDescription.html(result[a].description);
                    urlButton.html("Visit Website");
                    urlButton.attr({onclick: 'location.href=' + "'" + result[a].url + "'"});
                    // parkURL.html(result[a].url);
                    parkDirections.html(result[a].directionsInfo);
                    parkWeatherInfo.html(result[a].weatherInfo);
                    parkContactHeader.html("<br>" + "Contact Park");
                    parkPhone.html("Phone: " + result[a].contacts.phoneNumbers[0].phoneNumber + "<br>");
                    parkEmail.html("Email: " + result[a].contacts.emailAddresses[0].emailAddress + "<br>");

                    parkImg.append(img);
                    parkDiv.append(img, parkName, parkDescription);

                    $("#activities").append(parkDiv);
                    // call open weather api to get weather for the current park response
                    getParkWeather(parkLat, parkLon, a, parkContactHeader, parkPhone, parkEmail, urlButton);

                }
            }
        },
    });
}

//Function to get park weather information and push to the page
function getParkWeather(parkLat, parkLon, a, parkContactHeader, parkPhone, parkEmail, urlButton) {
    var weatherqueryURL =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        parkLat +
        "&lon=" +
        parkLon +
        "&units=imperial&appid=" +
        weatherapiKey;
    $.ajax({
        url: weatherqueryURL,
        method: "GET",
        success: function (weather) {
            var weatherHeader = $("<p>").attr("class", "cardSectionHeader");
            var weathDiv = $("<div>").attr("class", "card");
            var date = $("<p>").attr("class", "weather");
            var descrip = $("<span>").attr("class", "weather");
            var temp = $("<span>").attr("class", "weather");
            var humidity = $("<span>").attr("class", "weather");
            var weathIcon = $("<img>").attr("class", "weather");

            weatherHeader.html("Park Weather");
            weathDiv.css({ margin: "20px", width: "300px", display: "block" });
            date.html(moment(weather.dt, "X").format("MM/DD/YY"));
            descrip.html("Forecast: " + weather.weather[0].main);
            temp.html("<br>" + "Temperature: " + weather.main.temp + " &deg F");
            humidity.html("<br>" + "Humidity: " + weather.main.humidity + "%" + "<br>");
            weathIcon.attr(
                "src",
                "https://openweathermap.org/img/wn/" + weather.weather[0].icon + ".png"
            );

            $("#card-" + a).append(weatherHeader, descrip, temp, humidity, parkContactHeader, parkPhone, parkEmail, urlButton);

        },
    });
}

//quote randomizer
var queryURL = "https://type.fit/api/quotes";

//Retrieve a quote and push to the page
function getQuote() {
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        var randInt = Math.floor(Math.random() * 1683);
        var data = JSON.parse(response);
        var author = data[randInt].author;
        var author2 = "Unknown";
        if (author !== null) {
            author = author;
        } else {
            author = author2;
        }

        $("#quote").text(data[randInt].text + "  ");
        $("#quote").append("~  " + author);

    });
}
