const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    code: {
        type: String,
        trim: true,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now
    },

}, { timestamps: true })

module.exports = mongoose.model("Category", CategorySchema)