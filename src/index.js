const express = require("express");
const app = express();
require('dotenv');
const cors = require("cors");
const { forgotPassword, resetPasswordFromLink, verifyAndResetPassword } = require("./controllers/userController");
const port = process.env.PORT || 5000;
app.use(cors());
app.options("*", cors());

// mongo
require('../config/db');

// routes
const userRouter = require("./routes/userRoutes");
const formRouter = require("./routes/formRoutes");

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