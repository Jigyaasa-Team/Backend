const userModel = require("../models/user");
const bugModel = require("../models/bug");
const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer");
// const randomString = require("randomstring");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

const sendResetPasswordMail = async (username, email, passwordResetToken) => {
    try {
        const { email } = req.body;
    } catch (err) {
        res.status(400).json({ message: `Something went wrong! ${err}` });
    }
}

const signup = async (req, res) => {
    let { username, email, password } = req.body;
    if (username == "" || email == "" || password == "" || !username || !email || !password) {
        res.status(400).json({
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
            return res.status(500).json({ message: `Something went wrong! ${err}` });
        }
    }
};

const signin = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password)
        return res.status(400).send({message: "Email and password required" });
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
        res.status(200).json({ user: existingUser, token });
    } catch (err) {
        return res.status(500).json({ message: `Something went wrong! ${err}` });
    }
};

const forgotPassword = async (req, res) => {
    try {
        // const existingUser = await userModel.findOne({ email: req.body.email });
        // if(existingUser) {
        //     const randomstring = randomString.generate();
        //     const data = await userModel.updateOne({email}, {$set: {passwordResetToken: randomstring}});
        //     res.status(200).json({ message: "Please check your email to reset your password." });
        // } else {
        //     res.status(200).json({ message: "User doesn't exists!" });
        // }
    } catch (err) {
        res.status(400).json({ message: `Something went wrong! ${err}` });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body;

        const existingUser = await userModel.findOne({ email: req.email });
        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if(matchPassword) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    
            const userPassword = await userModel.findByIdAndUpdate({ _id: req.userId }, { password: hashedPassword }, { new: true });
            return res.status(200).json({ message: "Password changed successfully!", password: userPassword });
        } else {
            return res.status(400).json({ message: "Current password doesn't match!" });
        }
    } catch (err) {
        res.status(400).json({ message: `Something went wrong! ${err}` });
    }
};

const reportBugs = async (req, res) => {
    try {
        const { description } = req.body;
        const email = req.email;

        const result = await bugModel.create({
            userId: req.userId,
            email,
            description
        })
    
        // send response 
        res.status(201).json({ bug: result });

    } catch (err) {
        res.status(400).json({ message: `Something went wrong! ${err}` });
    }
};

module.exports = { signin, signup, forgotPassword, reportBugs, resetPassword };