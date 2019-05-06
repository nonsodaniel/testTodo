const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Reply_commentSchema = new Schema({

    commentId: {
        type: String,
        required: true
    },

    newsId: {
        type: String,
        required: true,
    },

    reply_comment: {
        type: String,
        trim: true,
        required: true
    },

    posted_by: {
        type: String,
        trim: true,
        required: true
    },

}, { timestamps: true } )

module.exports = mongoose.model("Reply_Comments", Reply_commentSchema)