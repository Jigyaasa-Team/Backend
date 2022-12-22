const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "FORMAPI";

const signup = async (req, res) => {
    let { username, email, password } = req.body;
    username = username.trim();
    email = email.trim();
    password = password.trim();
    if (username == "" || email == "" || password == "") {
        res.json({
          status: "FAILED",
          message: "Empty fields are unacceptable!",
        });
    } else if (!/^[a-zA-Z ]*$/.test(username)) {
        res.json({
          status: "FAILED",
          message: "Invalid name!",
        });
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        res.json({
          status: "FAILED",
          message: "Invalid Email!",
        });
    } else if (password.length < 6) {
        res.json({
          status: "FAILED",
          message: "Password length must be greater than or equal to 6!",
        });
    } else {
        try {
            // check for existing user
            const existingUser = await userModel.findOne({ email: email})
            if(existingUser) {
                return res.status(400).json({ message: "A user with the provided email already exists!" });
            }
    
            // hash password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            
            // user creation
            const result = await userModel.create({
                username,
                email,
                password: hashedPassword
            })
    
            // generate token
            const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    
            // send response 
            res.status(201).json({ user: result, token });
        } catch (err) {
            res.status(500).json({ message: `Something went wrong! ${err}` });
        }
    }
};

const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // check for existing user
        const existingUser = await userModel.findOne({ email: email })
        if(!existingUser) {
            return res.status(404).json({ message: "User doesn't exist!" });
        }

        // hash and compare passwords
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if(!matchPassword) {
            return res.status(400).json({ message: "Invalid credentials!" })
        }

        // generate token
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);
        
        // send response
        res.status(201).json({ user: existingUser, token });
    } catch (err) {
        res.status(500).json({ message: `Something went wrong! ${err}` });
    }
};

module.exports = { signin, signup };