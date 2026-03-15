const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({

name:String,

owner:String

});

module.exports = mongoose.model("Shop",shopSchema);