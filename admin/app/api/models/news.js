const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({

    title: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: String,
        trim: true,
    },
    content: {
        type: String,
        trim: true,
        required: true,
    },
    author: {
        type: String,
        trim: true,
        required: true
    },
    likes: {
        type: Array,
        default: [],
    },
    views: {
        type: Array,
        default: [],
    },
    comments: {
        type: Array,
        default: []
    },

    // comments: [
    //     {
    //         author: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: 'User'
    //         },
    //         text: String
    //     }
    // ],


    news_dp: {
        type: String,
        required: false,
        trim: true
    },
    date_created: {
        type: Date,
        default: Date.now
    }



}, { timestamps: true })

module.exports = mongoose.model('News', NewsSchema);