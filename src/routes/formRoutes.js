const express = require("express");
const formRouter = express.Router();

formRouter.post("/create", (req, res) => {

});

formRouter.post("/signin", (req, res) => {
    res.send("working")
});

module.exports = formRouter;