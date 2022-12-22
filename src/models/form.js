const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

const Form = mongoose.model('Form', FormSchema);

module.exports = Form; 