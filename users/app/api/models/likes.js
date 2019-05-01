const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    userId: {
        type: String,
        trim: true,
        required: true,
    },

    newsId: {
        type: String,
        trim: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Likes', LikeSchema);