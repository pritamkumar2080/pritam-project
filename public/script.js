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
window.onload = getLocation

