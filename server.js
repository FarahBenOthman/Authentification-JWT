const express=require("express")
const app=express()
const connectDB=require("./config/connectDB")
require("dotenv").config()
connectDB()
app.use(express.json())

const PORT = process.env.PORT || 4000

//const path=require("path")
//css
//app.use(express.static('public'))

//app.set("view engine", "pug")
//app.set("views", path.join(__dirname,"views"))

//var home=require("./routes/home")



app.use("/auth", require("./routes/authRoutes"))
//app.use("/", home.home)
//app.use("/home", home.home)
app.use("/products", require("./routes/products"))

app.listen(PORT, ()=> { console.log("Server is running on Port", + process.env.PORT)})