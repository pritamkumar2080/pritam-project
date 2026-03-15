// 📍 location
function getLocation(){

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(async function(position){

let lat = position.coords.latitude
let lon = position.coords.longitude

let res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)

let data = await res.json()

let city =
data.address.city ||
data.address.town ||
data.address.village

document.getElementById("location-input").value = city

})

}

}


// popup close
function closeAd(){
document.getElementById("ad-popup").style.display="none"
}


// page load
window.addEventListener("load", function(){

getLocation()

// 1️⃣ splash 4 sec
setTimeout(function(){

document.getElementById("splash").style.display="none"

// 2️⃣ popup 1 sec बाद show
setTimeout(function(){

document.getElementById("ad-popup").style.display="flex"

},500)

},2000)

})