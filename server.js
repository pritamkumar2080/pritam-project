
const express = require("express")
const mongoose = require("mongoose")
const multer = require("multer")
const path = require("path")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/sitacitymart")
.then(()=>console.log("MongoDB Connected"))

const storage = multer.diskStorage({

destination:(req,file,cb)=>{
cb(null,"public/uploads")
},

filename:(req,file,cb)=>{
cb(null,Date.now()+path.extname(file.originalname))
}

})

const upload = multer({storage:storage})


const productSchema = new mongoose.Schema({
shop:String,
name:String,
price:Number,
image:String
})

const Product = mongoose.model("Product",productSchema)


// add product

app.post("/add-product", upload.single("image"),async(req,res)=>{
try{
    if (!req.body.name || !req.body.price) {
        return res.status(400).send("Missing data")
    }
const product = new Product({

shop:req.body.shop,
name:req.body.name,
price:Number(req.body.price),
image:"/uploads/" +req.file.filename

})

await product.save()

res.send("Product Added")
} catch (err) {
    console.log(err)
    res.status(500).send("error adding product")
}

})


// get products

app.get("/products/:shop", async(req,res)=>{
    try{

const products = await Product.find({shop:req.params.shop})

res.json(products)
    } catch (err) {
        res.status(500).json({error:"server error"})
    }

})


app.listen(3000,()=>{
console.log("Server running on port 3000")
})
