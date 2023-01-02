const express = require("express");
const { signin, signup, reportBugs, resetPassword } = require("../controllers/userController");
const userRouter = express.Router();
const auth = require("../middlewares/auth");

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.post("/reportBugs", auth, reportBugs);
userRouter.patch("/resetPassword", auth, resetPassword);

module.exports = userRouter;