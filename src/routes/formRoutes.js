const express = require("express");
const { saveForm, deleteForm, getAllForms } = require("../controllers/formController");
const formRouter = express.Router();
const auth = require("../middlewares/auth");

formRouter.post("/", auth, saveForm);
formRouter.get("/", auth, getAllForms);
formRouter.delete("/:id", auth, deleteForm);

module.exports = formRouter;