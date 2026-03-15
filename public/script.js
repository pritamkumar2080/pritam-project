// 📍 Location detect
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

const locInput = document.getElementById("location-input")

if(locInput){
locInput.value = city
}

})

}

}


// ❌ popup close
function closeAd(){

const popup = document.getElementById("ad-popup")

if(popup){
popup.style.display="none"
}

}


// 🌐 page load
window.addEventListener("load", function(){

getLocation()

const splash = document.getElementById("splash")
const loginBox = document.getElementById("login-box")

if(splash){

setTimeout(function(){

splash.style.display="none"

if(loginBox){
loginBox.style.display="flex"
}

},3000)

}

})


// 🖼 Image Slider
let slides = document.querySelector(".slides")

if(slides){

let index = 0
const totalSlides = document.querySelectorAll(".slides img").length

setInterval(()=>{

index++

if(index >= totalSlides){
index = 0
}

slides.style.transform = `translateX(-${index * 100}%)`

},2000)

}


// 🔐 LOGIN SYSTEM
function login(){

fetch("/login",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

email:document.getElementById("email").value,
password:document.getElementById("password").value

})

})

.then(res=>res.json())

.then(data=>{

if(data.status==="fail"){
alert("Wrong email or password")
return
}

const loginBox = document.getElementById("login-box")
const popup = document.getElementById("ad-popup")

if(loginBox){
loginBox.style.display="none"
}

if(popup){
popup.style.display="flex"
}

// popup 3 sec baad redirect
setTimeout(()=>{

if(data.role==="admin"){

window.location.href="admin.html"

}
else if(data.role==="shopkeeper"){

window.location.href=`dashboard.html?shop=${data.shop}`

}
else{

window.location.href="index.html"

}

},3000)

})

}