"use strict";

// onload functions
window.onload = init;

function init() {
    // läs in dishes
    headerdatetime();
    getLocation();

}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {

    let y = position.coords.latitude;
    let x = position.coords.longitude;

    console.log(y, x);

   
}


// prints date and time in header on start
let headerdtel = document.getElementById("headerdt");

function headerdatetime() {
    let dt = getHeaderdate();
    headerdtel.innerHTML = dt;
}




// get day number
function getHeaderdate() {

    const Monthname = ["January", "February", "Mars", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var t = new Date();
    let day = "";
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

    if (t.getDate() < 10) {
        day = "0" + t.getDate();
    } else {
        day = t.getDate();
    }

    let m = Monthname[t.getMonth()];

    let daymonth = day + " " + m + " - " + hour + ":" + min;

    return daymonth;
}




// menu dropdown

function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}


