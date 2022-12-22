const express = require("express");
const app = express();
const port = 3000;

// mongo
require('../config/db');

// routes
const userRouter = require("./routes/userRoutes");
const formRouter = require("./routes/formRoutes");

app.use(express.json());

app.use((req, res, next) => {
    console.log("http method - " + req.method + " URL - " + req.url);
    next();
})

app.use("/users", userRouter);
app.use("/forms", formRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})