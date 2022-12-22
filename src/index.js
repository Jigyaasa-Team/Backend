const express = require("express");
const app = express();
const port = 3000;

// mongo
require('../config/db');
app.use(express.json());

// routes
const userRouter = require("./routes/userRoutes");
const formRouter = require("./routes/formRoutes");

app.use("/users", userRouter);
app.use("/forms", formRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})