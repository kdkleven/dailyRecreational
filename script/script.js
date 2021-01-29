var corsVar = "https://chriscastle.com/proxy/index.php?:proxy:"    
var desZipcode = "90742"

var zipcode = $('#input').val();

var weatherapiKey = "73d3cee72322c512646546f162d5afe5";
var weatherqueryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + "&units=imperial&appid=" + weatherapiKey;

var activityAPIKey = "hx8d23rqt44s3d3852d96x4v";
var activityqueryURL = corsVar + "http://api.amp.active.com/v2/search/?near=" + zipcode + "&current_page=1&per_page=10&sort=distance&exclude_children=true&api_key=" + activityAPIKey;    
    

var zipcodeAPIKey = "ZjHz81gGy2vO2MQx3iYvDmmBBljAfRQzjbTg85zxDDPqSDZGjFiygyYRPNenp2pR";
var zipCodequeryURL = corsVar + "https://www.zipcodeapi.com/rest/" + zipcodeAPIKey + "/distance.json/" + zipcode + "/" + desZipcode + "/mile";


$('#submit').on("click",function(e){
    e.preventDefault();
    zipcode = $('#input').val();
    weatherqueryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + "&units=imperial&appid=" + weatherapiKey;
    console.log("Zip Code: " + zipcode);
    

    $.ajax({    
    url: weatherqueryURL,
    method: "GET"
    }).then(function (weather) {
        console.log(weatherqueryURL);
        console.log(weather.main.temp);
        console.log(weather.main.temp_min);
        console.log(weather.main.temp_max);
        console.log(weather.main.humidity);
        console.log(weather.name);
        console.log(moment((weather.dt), "X").format("MM/DD/YY"));
        //compareZip();
        getActivity();
        
    });

    function getActivity() {
    activityqueryURL = corsVar + "http://api.amp.active.com/v2/search/?near=" + zipcode + "&current_page=1&per_page=10&sort=distance&exclude_children=true&api_key=" + activityAPIKey;    
    
        $.ajax({
        url: activityqueryURL,
        method: "GET",
        // headers: {'Origin': "http://api.amp.active.com/v2/search/?zip=" + zipcode + "&current_page=1&per_page=10&sort=distance&exclude_children=true&api_key=" + activityAPIKey}
        }).then(function (activities) {
            console.log(JSON.parse(activities));
            
            
            for (var i = 0; i < 5; i++) {
                console.log(JSON.parse(JSON.stringify(activities[i].assetName))); 
            }
                                    
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
});