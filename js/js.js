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
                    .then(data => printWeather(data))
                    .catch(err => console.log(err))
            }
        })
}


let weatherContentEl = document.getElementById("weathercontent");

// prints weather-data to screen
function printWeather(data) {

    let time = getTime();
    // let bgcolor = bgColor();
    // console.log(cityname + "hejhej");
    console.log(data);
    console.log(time);



    weatherContentEl.innerHTML =
        `
        <div class="datetime"> 
            <span>${data.name}, ${data.sys.country}</span> <br>
            ${time} 
        </div>
        <div class="weathericon">
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="${data.weather[0].dexcription}" >
            </img>
        </div>
        <div class="currenttemp"> 
            ${Math.round(data.main.temp - 273.15)}°  <br>
        </div>
        <div class="weatherinfo"> 
            <span>${data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}</span> <br>
            Wind: ${Math.round(data.wind.speed)} km/h, at ${Math.round(data.wind.deg)}° <br>
            Humidity: ${Math.round(data.main.humidity)}% 
        </div>
        
        `;








}



// function bgColor(){


//     if (data.weather[0].description = "rain" || "shower rain") {
//         document.getElementById("main").style.backgroundImage = "linear-gradient(#CBFFEC, #fff)";
//     } else if (data.weather[0].description = "clear sky" || "few clouds" || "broken clouds" || "scattered clouds") {
//         document.getElementById("main").style.backgroundImage = "linear-gradient(#FFEA9F, #fff)";
//     } else if (data.weather[0].description = "snow") {
//         document.getElementById("main").style.backgroundImage = "linear-gradient(#000, #fff)";
//     }

// }



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