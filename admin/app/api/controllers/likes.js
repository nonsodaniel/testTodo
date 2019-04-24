const newsModel = require('../models/news');
const fs = require('fs');



module.exports = {
    create: async (req, res, next) => {
        console.log(req.body)
        const obj = req.body;
        await newsModel.create({
            title: obj.title, category: obj.category,

        })
    },
    getById: (req, res, next) => {
        newsModel.findById(req.params.newsId, (err, result) => {
            if (err) throw err
            else res.json({ status: "Success", message: "News found", data: result })
        })
    },
    getAll: (req, res, next) => {
        const newsList = [];
        newsModel.find({}, (err, result) => {
            if (err) throw err
            else
                for (let news of result) {
                    newsList.push({
                        id: news.id, title: news.title, category: news.category,
                        content: news.content, author: news.author,
                        likes: news.likes, views: news.views, comments: news.comments,
                        date: news.date
                    })
                }
            res.json({ status: "Success", message: "News list found!!!", data: newsList })
        })
    },
    updateById: (req, res, next) => {
        const obj = req.body
        newsModel.findOneAndUpdate(req.params.newsId, {
            title: obj.title, category: obj.category,
            content: obj.content, author: obj.author
        }, (err, result) => {
            if (err) throw err
            else res.json({ status: "Success", message: "News updated successfully!!!", data: result })
        })
    },
    deleteById: (req, res, next) => {
        newsModel.findOneAndDelete(req.params.newsId, (err, result) => {
            if (err) throw err
            else res.json({ status: "Success", message: "News deleted successfully!!!", data: result })
        })
    },
}