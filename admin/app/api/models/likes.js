const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    userId: {
        type: [],
        trim: true,
        required: true,
    },

    newsId: {
        type: String,
        trim: true,
    },

    date_created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('News', NewsSchema);