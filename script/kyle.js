// take in the user's zip code
// take in an activity 
// validate form fields
// if zip code is > 5 numbers, or typeof != number, return error/none
// if activity field is "select activity" return error
// on submit, call zip code radius api to identify all zip codes in a 100 radius
// store zip codes and state codes in an array/object
// parse stored zip codes and state codes into a unique list of state codes
// call nps api using the unique state code list (state code) and provided activity (query)
// return list of activities with images, links, descriptions, etc.



var corsVar = "https://chriscastle.com/proxy/index.php?:proxy:";

var stateInput;
var activityInput;

var npsAPIkey = "3eMx7JuhaDduCgDGcbpUQDSwo9EBymREAUXmdQch";
var npsQueryURL = "https://developer.nps.gov/api/v1/parks?q=&api_key=" + npsAPIkey;

var weatherapiKey = "73d3cee72322c512646546f162d5afe5";
var weatherqueryURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=" + weatherapiKey;


// var zipcodeAPIKey = "ZjHz81gGy2vO2MQx3iYvDmmBBljAfRQzjbTg85zxDDPqSDZGjFiygyYRPNenp2pR";
// var zipCodequeryURL = corsVar + "https://www.zipcodeapi.com/rest/" + zipcodeAPIKey + "/distance.json/" + zipcode + "/" + desZipcode + "/mile";

$('#submit').on("click", function (e) {
    e.preventDefault();
    
    stateInput = $('#selectedState').val();
    activityInput = $('#selectedActivity').val();
    
    console.log("Zipcode input: " + stateInput);
    console.log("Activity input: " + activityInput);
    
    getQuote();
    getParkInfo(stateInput, activityInput);

});

function getParkInfo(stateInput, activityInput) {

    npsQueryURL = "https://developer.nps.gov/api/v1/parks?stateCode="+ stateInput + "&q=" + activityInput + "&api_key=" + npsAPIkey;
    $.ajax({
        url: npsQueryURL,
        method: "GET",

    }).then(function (response) {

        var result = response.data;
        console.log(result);

        
        
        

        for (var a = 0; a < result.length; a++) {    
            var parkDiv = $('<div>').attr('class', 'card');
            var parkName = $('<h4>').attr('class', 'cardTitle');
            var parkImg = $('<img>').attr('class', 'cardImg');
            var parkDescription = $('<p>').attr('class', 'cardDescription');
            var parkURL = $('<a>').attr('href', result[a].url);
            // var parkLat;
            // var parkLon;
            // var parkOperatingHours;

            parkDiv.css({margin: '20px', width: "300px", display: "block"});
            parkName = result[a].fullName;
            parkImg.attr({src: result[a].images[0].url, width: "250px", height: "auto"});
            parkDescription = result[a].description;
            parkURL = result[a].url;
            // var parkFullName = $('<h3>').attr('class', 'cardHeader');
            // var parkImage = $('<img>').attr('class', 'cardHeader');
            
            // parkFullName.html(result[a].fullName);
            // parkImage.attr('src', result[a].images[0]);
            
            // cardDiv.append(parkFullName, parkImage);
            parkDiv.append(parkName, parkImg, parkDescription, parkURL);
            
            $('#activities').append(parkDiv);
            

            
        }     
    });
}

function getWeather() {
    
    weatherqueryURL = "https://api.openweathermap.org/data/2.5/weather?state=" + stateInput + "&units=imperial&appid=" + weatherapiKey;

    $.ajax({
        url: weatherqueryURL,
        method: "GET"
    }).then(function (weather) {
        //console.log(weatherqueryURL);
        console.log(weather.main.temp);
        console.log(weather.main.temp_min);
        console.log(weather.main.temp_max);
        console.log(weather.main.humidity);
        console.log(weather.name);
        console.log(moment((weather.dt), "X").format("MM/DD/YY"));
        compareZip();


    });
}

//quote randomizer
var queryURL = "https://type.fit/api/quotes";
var randInt = Math.floor(Math.random() * 1683);
console.log(randInt);


//get quote wrapped in a function.  To be used with the onclick event
function getQuote() {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var data = JSON.parse(response);
        var author = (data[randInt].author);
        var author2 = "Unknown";
        if (author !== null) {
            author = author;
        } else {
            author = author2;
        }

        $("#quote").text(data[randInt].text + "  ");
        $("#quote").append("~  " + (author));
    });

}



