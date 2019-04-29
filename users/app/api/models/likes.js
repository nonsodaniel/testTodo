const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikesSchema = new Schema({

    likes: {
        type: String,
        trim: true,
        required: true
    },
    liked_by: {
        type: String,
        trim: true,
    },
    postId: {
        type: Number
    }

}, { timestamps: true })

module.exports = mongoose.model('Likes', LikesSchema);