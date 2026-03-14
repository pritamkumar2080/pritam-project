async function loadProducts(){

const params = new URLSearchParams(window.location.search)

const shop = params.get("name")

if(!shop){
alert("Shop not found")
return
}

try{

const res = await fetch("/products/" + shop)

if(!res.ok){
throw new Error("Server error")
}

const products = await res.json()

const container = document.getElementById("product-container")

if(products.length === 0){
container.innerHTML = "<p>No products available</p>"
return
}

container.innerHTML = products.map(p =>

`

<div>

<img src="${p.image}" class="product-img">

<h3>${p.name}</h3>

<p>₹${p.price}</p>

</div>

`

).join("")

}catch(error){

console.error(error)

}

}

window.onload = loadProducts