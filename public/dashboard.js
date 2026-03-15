const url=new URLSearchParams(window.location.search)

const shop=url.get("shop")

function loadProducts(){

fetch(`/products/${shop}`)

.then(res=>res.json())

.then(data=>{

const box=document.getElementById("products")

box.innerHTML=""

data.forEach(p=>{

box.innerHTML+=`

<div class="product">

<h3>${p.name}</h3>

<p>Price: ₹${p.price}</p>

<p>Offer: ${p.offer}</p>

<button onclick="deleteProduct('${p._id}')">Delete</button>

</div>

`

})

})

}

loadProducts()


function addProduct(){

fetch("/product",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name:document.getElementById("name").value,
price:document.getElementById("price").value,
image:document.getElementById("image").value,
offer:document.getElementById("offer").value,
shop:shop

})

})

.then(()=>loadProducts())

}


function deleteProduct(id){

fetch(`/product/${id}`,{

method:"DELETE"

})

.then(()=>loadProducts())

}