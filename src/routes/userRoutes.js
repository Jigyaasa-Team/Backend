const express = require("express");
const { signin, signup, reportBugs } = require("../controllers/userController");
const userRouter = express.Router();
const auth = require("../middlewares/auth");

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.post("/reportBugs", auth, reportBugs);

module.exports = userRouter;