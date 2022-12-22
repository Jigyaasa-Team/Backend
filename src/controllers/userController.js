const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "FORMAPI";

const signup = async (req, res) => {
    const { username, email, password } = req.body;
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
            password
        })

        // generate token
        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);

        res.status(201).json({ user: result });
    } catch (err) {
        res.status(500).json({ message: `Something went wrong! ${err}` });
    }
};

const signin = (req, res) => {

};

module.exports = { signin, signup };