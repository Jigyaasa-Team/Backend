const formModel = require("../models/form");
// const jwt = require("jsonwebtoken");

const saveForm = async (req, res) => {
    console.log(req.userId);
    const { responderUri, title, formId } = req.body;

    const newForm = new formModel({
        userId: req.userId,
        formId,
        responderUri,
        title
    })

    try {
        await newForm.save();
        res.status(201).json(newForm);
    } catch (err) {
        res.status(500).json({ message: `Something went wrong! ${err}`});
    }
}

const getAllForms = async (req, res) => {
    try {
        const forms = await formModel.find({userId: req.userId});
        res.status(200).json(forms);
    } catch(err) {
        res.status(500).json({ message: `Something went wrong! ${err}`});
    }
}

const deleteForm = async (req, res) => {
    const id = req.params.id;
    try {
        const form = await formModel.findByIdAndRemove(id);
        res.status(202).json(form);
    } catch(err) {
        res.status(500).json({ message: `Something went wrong! ${err}`});
    }
}

module.exports = { saveForm, getAllForms, deleteForm };