"use strict";


const b = document.getElementById("test");
const messageEl = document.getElementById("message");


// window.onload = init;

// function init() {
//     // läs in dishes
//     start();
// }



function search() {
    // event.preventDefault(); //hindrar deafult (i detta fall att ladda om/uppdatera sidan vid sumbit)

    let cityname = cityInput.value;

    return cityname;
    // checkWeather(cityname);
}


const cityInput = document.getElementById("city");
const SubmitBtn = document.getElementById("submit");

SubmitBtn.addEventListener("click", start);

function start(event) {
    event.preventDefault(); //hindrar deafult (i detta fall att ladda om/uppdatera sidan vid sumbit)

    let cityname = search();

    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=4157705def25a1b2a20ad3aafda2f6e3";

    fetch(url)
        .then(Response => {
            if (Response.status === 401) {

                messageEl.innerHTML = "<h3>Unauthorized!</h3>";

            } else if (Response.status === 200) {

                return Response.json()
                    // .then(data => console.log(data))
                    .then(data => start2(data))
                    .catch(err => console.log(err))


            }
        })
}



function start2(data) {
    // event.preventDefault(); //hindrar deafult (i detta fall att ladda om/uppdatera sidan vid sumbit)


    console.log(data.coord.lon);
    console.log(data.coord.lat);

    let lon = data.coord.lon;
    let lat = data.coord.lat;

    let url2 = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=4157705def25a1b2a20ad3aafda2f6e3";


    fetch(url2)
        .then(Response => {
            if (Response.status === 401) {

                messageEl.innerHTML = "<h3>Unauthorized!</h3>";

            } else if (Response.status === 200) {

                return Response.json()
                    // .then(data => console.log(data))
                    .then(data => printWeather(data))
                    .catch(err => console.log(err))
            }
        })
        
}








let weatherContentEl = document.getElementById("weathercontent");

// prints weather-data to screen
function printWeather(data) {

    let time = getTime();

    console.log(data);
    console.log(time);
 

    let weatherid = data.list[0].weather[0].id;
    console.log(weatherid);
    bg(weatherid);


    console.log(data.city.country);

    weatherContentEl.innerHTML =
        `
        <div class="datetime"> 
            <span>${data.city.name}, ${data.city.country}</span> <br>
            ${time} 
        </div>
        <div class="weathericon">
            <img 
                src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png" alt="${data.list[0].weather[0].description}" >
            </img>
        </div>
        <div class="currenttemp"> 
            ${Math.round(data.list[0].main.temp - 273.15)}°  <br>
        </div>
        <div class="weatherinfo"> 
            <span>${data.list[0].weather[0].description.charAt(0).toUpperCase() + data.list[0].weather[0].description.slice(1)}</span> <br>
            Wind: ${Math.round(data.list[0].wind.speed)} km/h, at ${Math.round(data.list[0].wind.deg)}° <br>
            Humidity: ${Math.round(data.list[0].main.humidity)}% 
        </div>
        <div class="futureforecast">
            <div>
                <img 
                    src="http://openweathermap.org/img/wn/${data.list[1].weather[0].icon}.png" alt="${data.list[1].weather[0].description}" >
                </img>
                ${Math.round(data.list[1].main.temp - 273.15)}° <br>
                ${data.list[1].dt_txt.substring(11, 16)} <br>
            </div>
            <div>
                <img 
                     src="http://openweathermap.org/img/wn/${data.list[2].weather[0].icon}.png" alt="${data.list[2].weather[0].description}" >
                 </img>
                 ${Math.round(data.list[2].main.temp - 273.15)}° <br>
                 ${data.list[2].dt_txt.substring(11, 16)} <br>
            </div>
            <div>
                 <img 
                     src="http://openweathermap.org/img/wn/${data.list[3].weather[0].icon}.png" alt="${data.list[3].weather[0].description}" >
                 </img>
                 ${Math.round(data.list[3].main.temp - 273.15)}° <br>
                 ${data.list[3].dt_txt.substring(11, 16)} <br>
            </div>
            <div>
                 <img 
                     src="http://openweathermap.org/img/wn/${data.list[4].weather[0].icon}.png" alt="${data.list[4].weather[0].description}" >
                 </img>
                 ${Math.round(data.list[4].main.temp - 273.15)}° <br>
                 ${data.list[4].dt_txt.substring(11, 16)} <br>
            </div>
        </div>
        
        `;

}


//bg video depending on weather-id
function bg(weatherid){

    console.log(weatherid);
    if (weatherid >= 200 && weatherid <= 232 ) {
        document.getElementById("background-video").src = "videos/thunderstorm.mp4";
    }  else if (weatherid >= 500  && weatherid <= 531) {
        document.getElementById("background-video").src = "videos/rain.mp4";
    } else if (weatherid >= 600  && weatherid <= 622) {
        document.getElementById("background-video").src = "videos/snow.mp4";
    } else if (weatherid = 800) {
       document.getElementById("background-video").src = "videos/sunny.mp4";
    } else if (weatherid >= 803  && weatherid <= 804) {
        document.getElementById("background-video").src = "videos/overcast_clouds.mp4";
    } else if (weatherid >= 801  && weatherid <= 802) {
        document.getElementById("background-video").src = "videos/scattered_clouds.mp4";
    } 

}




// function bgColor(weatherid){

//     console.log(weatherid);
//     if (weatherid >= 500 && weatherid <= 531 ) {
//         document.getElementById("main").style.backgroundColor = "blue";
//     }  else if (weatherid >= 600  && weatherid <= 622) {
//         document.getElementById("main").style.backgroundColor = "red";
//     } else if (weatherid = 800) {
//         document.getElementById("main").style.backgroundColor = "yellow";
//     } else if (weatherid >= 801  && weatherid <= 804) {
//         document.getElementById("main").style.backgroundColor = "green";
//     }

// }


// get day and time
function getTime() {

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    var t = new Date();
    let hour = "";
    let min = "";

    if (t.getHours() < 10) {
        hour = "0" + t.getHours();
    } else {
        hour = t.getHours();
    }

    if (t.getMinutes() < 10) {
        min = "0" + t.getMinutes();
    } else {
        min = t.getMinutes();
    }

    //returns name of current day
    let day = weekday[t.getDay()];

    let datetime = day + ", " + hour + ":" + min;

    return datetime;
}