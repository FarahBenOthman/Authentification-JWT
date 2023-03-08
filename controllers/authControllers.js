const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const User=require("../models/userSchema")


const login =  async (req, res) => {
    const { email, password } = req.body
    try {
//check if email exists in database (findone)
        const findUser = await User.findOne({email})
//send back response : status 400 (bad request), msg : user doesn't exist
        if(!findUser)
        { return res.status(400).json({msg : "User doesn't exist ! "})}
//is user exists : check if password is correct (compare) 
        const isMatch = await bcrypt.compare(password, findUser.password)
//send back a response : status 400 (bad request), msg : bad credentials
        if(!isMatch)
        { return res.status(400).json({msg: "Bad credentials "})}


        //generate a token

        const token = jwt.sign({ id: findUser._id}, process.env.JWT_SECRET,
            {expiresIn: "1d", 
            });

        res.status(200).json({msg:"Login successful", token: token})
//This is using the "bcrypt.compare" method to compare the plaintext password(entered by the user) to the hashed password. 
//The method returns a boolean value indicating whether the passwords match.

    } catch (err)
    { return res.status(500).json({ msg: err.message})}
}

const register = async (req, res) => {
    const { email, password } = req.body
    try {
        //email has to be unique: check if email exists in database (find one)
        // findOne() returns first doc that matches the query criteria or null if no doc matches
        //send back a response : status 400 ( bad request), msg "user already exist"
        const findUser = await User.findOne({email})
        if (findUser)
        {
            return res.status(400).json({ msg: "User already exist ! "})
        }

    const hashedPwd = await bcrypt.hash(password, 10)
//create a new instance of the User model based on the data in the request body and a hashed password.
    const newUser = new User({...req.body, password: hashedPwd}) 
//req.body: This is an object that contains the data submitted by the user in the request, such as email, name, etc.
//"...": The spread operator is used to expand the properties of the req.body object into separate properties.
//password: hashedPwd: This is adding a new property to the object with the key "password" and the value of the hashed password hashedPwd.
    newUser.save((err) => {
        if (err)
        { return res.status(500).json ({ msg: "Something went wrong ! "})}
        res.status(201).json ({ msg: "User created "})
    }) 

    } catch (err)
    {
        return res.status(500).json({ msg: err.message})
    }
}

//password has to be hashed : bcrypt (hash)
//save user to database: create
//send back a response : status 201(created), msg "user created"
//if user is created: status 500 (server error), msg "something is wrong"

module.exports = {login, register}