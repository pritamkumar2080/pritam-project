fetch("/shops")

.then(res=>res.json())

.then(data=>{

const list=document.getElementById("shop-list")

data.forEach(shop=>{

const div=document.createElement("div")

div.className="shop"

div.innerText=shop.name

div.onclick=function(){

window.location.href=`dashboard.html?shop=${shop.name}`

}

list.appendChild(div)

})

})