const express = require("express");
const { signin, signup, reportBugs, resetPassword } = require("../controllers/userController");
const userRouter = express.Router();
const auth = require("../middlewares/auth");
const cors = require("cors");


userRouter.post("/signup", cors(), signup);
userRouter.post("/signin", cors(), signin);
userRouter.post("/reportBugs", cors(), auth, reportBugs);
userRouter.patch("/resetPassword",cors(), auth, resetPassword);

module.exports = userRouter;