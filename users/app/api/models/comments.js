const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({

    comment: {
        type: String,
        trim: true,
        required: true
    },
    posted_by: {
        type: String,
        trim: true,
    },
    postId: {
        type: Number
    }

}, { timestamps: true })

module.exports = mongoose.model('Comments', CommentSchema);