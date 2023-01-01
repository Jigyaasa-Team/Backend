const express = require("express");
const app = express();
require('dotenv');
const cors = require("cors");
const port = process.env.PORT || 5000;

// mongo
require('../config/db');

// routes
const userRouter = require("./routes/userRoutes");
const formRouter = require("./routes/formRoutes");

app.use(express.json());
// app.use(express.urlencoded({extended: true}));

app.use(cors());

app.use("/users", userRouter);
app.use("/forms", formRouter);

app.get("/", (req, res) => {
    res.send("FMS api");
})

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})