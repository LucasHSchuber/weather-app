"use strict";

// onload functions
window.onload = init;

function init() {
    // läs in dishes
    datetime();
}


// prints date and time in header on start
let headerdtel = document.getElementById("headerdt");

function datetime() {

    let datetime = getTime();
    headerdtel.innerHTML = datetime;
}

// search function - gets input value
function search() {

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

    weathernow(data);

    let lon = data.coord.lon;
    let lat = data.coord.lat;

    let url2 = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=4157705def25a1b2a20ad3aafda2f6e3";


    fetch(url2)
        .then(Response => {
            if (Response.status === 401) {

                messageEl.innerHTML = "<h3>Unauthorized!</h3>";

            } else if (Response.status === 200) {

                return Response.json()
                    .then(data2 => printWeather(data2))
                    .catch(err => console.log(err))
            }
        })

}



let weathercontentel = document.getElementById("weathercontent");
let datetimeel = document.getElementById("datetime");
let weathericonel = document.getElementById("weathericon");
let currenttempel = document.getElementById("currenttemp");
let weatherinfoel = document.getElementById("weatherinfo");
let futureforecastel = document.getElementById("futureforecast");


function weathernow(data) {

    console.log(data);

    weathericonel.innerHTML =
        `
            <img 
                src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="${data.weather[0].description}" >
            </img>
         `;

    currenttempel.innerHTML =
        `
             ${Math.round(data.main.temp - 273.15)}°  <br>
         `;

    weatherinfoel.innerHTML =
        `
         <span>${data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}</span> <br>
         Wind: ${Math.round(data.wind.speed)} km/h, at ${Math.round(data.wind.deg)}° <br>
         Humidity: ${Math.round(data.main.humidity)}% 
         `;
}



// prints weather-data to screen
function printWeather(data) {

    let time = getTime();
    console.log(data);

    let weatherid = data.list[0].weather[0].id;
    bg(weatherid);

    datetimeel.innerHTML =
        `
            <span>${data.city.name}, ${data.city.country}</span> <br>
            ${time} 
        ` ;

    futureforecastel.innerHTML =
        `
        <div class="overscrollweather">
        <div>
            <img 
                src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png" alt="${data.list[0].weather[0].description}" >
            </img>
            ${Math.round(data.list[0].main.temp - 273.15)}° <br>
            ${data.list[0].dt_txt.substring(11, 16)} <br>
        </div>
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
        <div>
            <img 
                src="http://openweathermap.org/img/wn/${data.list[5].weather[0].icon}.png" alt="${data.list[5].weather[0].description}" >
            </img>
            ${Math.round(data.list[5].main.temp - 273.15)}° <br>
            ${data.list[5].dt_txt.substring(11, 16)} <br>
        </div>
        <div>
            <img 
                src="http://openweathermap.org/img/wn/${data.list[6].weather[0].icon}.png" alt="${data.list[6].weather[0].description}" >
            </img>
            ${Math.round(data.list[6].main.temp - 273.15)}° <br>
            ${data.list[6].dt_txt.substring(11, 16)} <br>
        </div>
        <div>
        <img 
            src="http://openweathermap.org/img/wn/${data.list[7].weather[0].icon}.png" alt="${data.list[7].weather[0].description}" >
        </img>
        ${Math.round(data.list[7].main.temp - 273.15)}° <br>
        ${data.list[7].dt_txt.substring(11, 16)} <br>
        </div>
        </div>
        `;

}


//bg video depending on weather-id
function bg(weatherid) {

    console.log(weatherid);
    if (200 <= weatherid && weatherid <= 232) {
        document.getElementById("background-video").src = "videos/thunderstorm2.mp4";
        document.getElementById("background-video").vid.playbackRate = 0.5;
    } else if (500 <= weatherid && weatherid <= 531) {
        document.getElementById("background-video").src = "videos/rain.mp4";
    } else if (weatherid <= 600 && weatherid <= 622) {
        document.getElementById("background-video").src = "videos/snow.mp4";
    } else if (803 <= weatherid && weatherid <= 804) {
        document.getElementById("background-video").src = "videos/overcast_clouds.mp4";
    } else if (801 <= weatherid && weatherid <= 802) {
        document.getElementById("background-video").src = "videos/scattered_clouds.mp4";
    } else if (weatherid == 800) {
        document.getElementById("background-video").src = "videos/sunny.mp4";
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







function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }