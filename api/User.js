const express = require("express");
const router = express.Router();

// mongodb user model
const User = require("../src/models/user");

// password handler
const bcrypt = require("bcrypt");

// Signin
router.post("/signin", (req, res) => {});

// Signup
router.post("/signup", (req, res) => {
  let { name, email, password } = req.body;
  name = name.trim();
  email = email.trim();
  password = password.trim();

  if (name == "" || email == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Empty fields are unacceptable!",
    });
  } else if (!/^[a-zA-Z ]*$/.test(name)) {
    res.json({
      status: "FAILED",
      message: "Invalid name!",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: "FAILED",
      message: "Invalid Email!",
    });
  } else if (password.length < 8) {
    res.json({
      status: "FAILED",
      message: "Password length must be greater than or equal to 8!",
    });
  } else {
    // checking if user already exists
    User.find({ email })
      .then((result) => {
        if (result.length) {
          res.json({
            status: "FAILED",
            message: "User with the provided email already exists!",
          });
        } else {
          const saltRounds = 10;
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPassword) => {
              const newUser = new User({
                name,
                email,
                password: hashedPassword,
              });

              newUser.save()
              .then(result => {
                res.json({
                    status: "SUCCESS", 
                    message: "Signup successful",
                    data: result
                });
              })
              .catch(err => {
                res.json({
                    status: "FAILED",
                    message: `An error occured while creating new user. Please try again later! ${err}`
                })
              })
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: `An error occured while hashing password! ${err}`,
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "FAILED",
          message: "An error occured while checking for existing users!",
        });
      });
  }
});

module.exports = router;
