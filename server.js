const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/User");
const Shop = require("./models/Shop");
const Product = require("./models/Product");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));


// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/sitacity")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));


// LOGIN SYSTEM
app.post("/login", async(req,res)=>{

console.log("Login request:", req.body);

try{

const user = await User.findOne({
email:req.body.email,
password:req.body.password
});

if(!user){
return res.json({status:"fail"});
}

res.json({
status:"ok",
role:user.role,
shop:user.shop
});

}catch(err){

console.log(err);
res.status(500).json({status:"error"});

}

});


// GET ALL SHOPS (ADMIN)
app.get("/shops", async(req,res)=>{

const shops = await Shop.find();
res.json(shops);

});


// GET PRODUCTS BY SHOP
app.get("/products/:shop", async(req,res)=>{

const products = await Product.find({
shop:req.params.shop
});

res.json(products);

});


// ADD PRODUCT
app.post("/product", async(req,res)=>{

const product = new Product(req.body);

await product.save();

res.json({message:"product added"});

});


// UPDATE PRODUCT
app.put("/product/:id", async(req,res)=>{

await Product.findByIdAndUpdate(req.params.id,req.body);

res.json({message:"updated"});

});


// DELETE PRODUCT
app.delete("/product/:id", async(req,res)=>{

await Product.findByIdAndDelete(req.params.id);

res.json({message:"deleted"});

});


app.listen(3000,()=>{
console.log("Server running on port 3000");
});