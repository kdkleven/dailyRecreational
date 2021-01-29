var corsVar = "https://chriscastle.com/proxy/index.php?:proxy:";
var desZipcode = "90742";

var zipcode;
var keyword;

var npsAPIkey = "3eMx7JuhaDduCgDGcbpUQDSwo9EBymREAUXmdQch";


var weatherapiKey = "73d3cee72322c512646546f162d5afe5";
var weatherqueryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + "&units=imperial&appid=" + weatherapiKey;

// NOT IN USE
// var activityAPIKey = "hx8d23rqt44s3d3852d96x4v";
// var activityqueryURL = corsVar + "http://api.amp.active.com/v2/search/?near=" + zipcode + "&current_page=1&per_page=10&sort=distance&exclude_children=true&api_key=" + activityAPIKey;    


var zipcodeAPIKey = "ZjHz81gGy2vO2MQx3iYvDmmBBljAfRQzjbTg85zxDDPqSDZGjFiygyYRPNenp2pR";
var zipCodequeryURL = corsVar + "https://www.zipcodeapi.com/rest/" + zipcodeAPIKey + "/distance.json/" + zipcode + "/" + desZipcode + "/mile";

$('#submit').on("click", function (e) {
    e.preventDefault();
    // alert("this worked");
    zipcode = $('#formGroupExampleInput').val().trim();
    console.log(zipcode);
    activity = $('option').text();
    //console.log(keyword);

    weatherqueryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + "&units=imperial&appid=" + weatherapiKey;

    // $.ajax({
    //     url: weatherqueryURL,
    //     method: "GET"
    // }).then(function (weather) {
    //     //console.log(weatherqueryURL);
    //     console.log(weather.main.temp);
    //     console.log(weather.main.temp_min);
    //     console.log(weather.main.temp_max);
    //     console.log(weather.main.humidity);
    //     console.log(weather.name);
    //     console.log(moment((weather.dt), "X").format("MM/DD/YY"));
    //     compareZip();


    // });
    getActivity(zipcode);

});

function getActivity(zipcode) {
    var npsQueryURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + zipcode + "&api_key=" + npsAPIkey;

    $.ajax({
        url: npsQueryURL,
        method: "GET",

    }).then(function (activities) {


        var result = activities.data;
        var postalCodes = [];
        var pCode = "";

        console.log(result);

        for (var i = 0; i < result.length; i++) {
            if (result[i].addresses[0]){
                pCode = result[i].addresses[0].postalCode;
                postalCodes.push(pCode);
            }
            

        }
        
        let unique = [...new Set(postalCodes)];
        console.log(unique);
    });
}


function compareZip() {

    $.ajax({
        url: zipCodequeryURL,
        method: "GET"
    }).then(function (zipCompare) {
        console.log(zipCodequeryURL);
    });
}
//quote randomizer
var queryURL = "https://type.fit/api/quotes";
var randInt = Math.floor(Math.random() * 1683);
console.log(randInt);

$.ajax ({
    url: queryURL,
    method: "GET"
}).then(function(response){
    var data = JSON.parse(response);
    // console.log(data);
    // console.log(data[randInt].text);
    // console.log(data[randInt].author);
    $("#quote").text(data[randInt].text + "  ");
    $("#quote").append("~  " + (data[randInt].author) );
});

//code to push to page needed

//PLACES WITHIN A 500 MILE RADIUS
// var zipRadius = corsVar + "https://www.zipcodeapi.com/rest/FmZssgT290OJYfl04zz7w5aoLTZqmkEd3FQv6KGDnVDEIBPrC3EVsSVMAJZiYLwM/radius.json/" + zipcode + "/500/mile"


// ZIP CODE TO STATE
var statequeryURL = corsVar + "https://www.zipcodeapi.com/rest/" + zipcodeAPIKey +"/info.json/" + zipcode + "/degrees";

$.ajax ({
    url: statequeryURL,
    method: "GET"
}).then(function(response){
    var data = JSON.parse(response);
    console.log(data);
    console.log(data.state);


});
