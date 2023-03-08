//auth houni mtaa ay aabd bech yaamel signIn ou signUp

const express=require("express")
const { login, register }=require("../controllers/authControllers")
const router=express.Router()

router.post("/login", login)
router.post("/register", register)

module.exports=router