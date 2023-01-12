const express = require("express");
const app = express();
require('dotenv');
const { forgotPassword } = require("./controllers/userController");
const port = process.env.PORT || 5000;

// cors management
const cors = require("cors");
app.options("*", cors({ origin: ["http://localhost:3000", "*"], optionsSuccessStatus: 200 }));
app.use(cors({ origin: ["http://localhost:3000", "*"], optionsSuccessStatus: 200 }));

// mongo
require('../config/db');

// routes
const {
    userRouter,
    formRouter
} = require("./routes");

app.use(express.json());
// app.use(express.urlencoded({extended: true}));


app.use("/users", userRouter);
app.use("/forms", formRouter);

app.post("/forgot-password", forgotPassword);
// app.get("/forgot-password/:id/:token", resetPasswordFromLink);
// app.post("/forgot-password/:id/:token", verifyAndResetPassword);

app.get("/", (req, res) => {
    res.send("FMS api");
})

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})