const express = require("express");
const { saveForm } = require("../controllers/formController");
const formRouter = express.Router();

formRouter.post("/save", saveForm);

module.exports = formRouter;