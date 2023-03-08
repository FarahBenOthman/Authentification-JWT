const mongoose=require("mongoose")

const productSchema = new mongoose.Schema({
    name : { type:String, required:true, unique:true},
    price : { type:String , required:true, unique:true},
    description : { type:String},
    image : { type:String},
    category : { type:String},
    quantity : { type:Number, required:true},
    createdAt : { type:Date, default:Date.now},
    
})

module.exports=mongoose.model("Product", productSchema)