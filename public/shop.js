const urlParams = new URLSearchParams(window.location.search);
const shopName = urlParams.get("name");

document.getElementById("shop-name").innerText =
shopName + " Shop Products";

const productList = document.getElementById("product-list");

for(let i=1;i<=50;i++){

const card = document.createElement("div");
card.className = "card";

card.innerHTML = `
<img src="image/images4.jpg">
<h3>Product ${i}</h3>
<p>₹${i*10}</p>
`;

productList.appendChild(card);

}