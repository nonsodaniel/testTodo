const newsModel = require('../models/news');
const fs = require('fs');



const saveImage = (name, imageFile, user_id, key) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./uploads/news/' + name, imageFile, 'base64', (err) => {
            console.log("name", name)
            if (err) return reject(err);
            newsModel.findByIdAndUpdate(user_id, { [key]: name }, (err, result) => {
                console.log("Result()=>", result)
                if (err) return reject(err);
                resolve({ status: "Success", message: `News  successfully got ${name}`, data: result })
            })
        });
    })
}



module.exports = {
    create: (req, res, next) => {
        const obj = req.body;
        newsModel.create({
            title: obj.title, category: obj.category,
            content: obj.content, author: obj.author,
            likes: obj.likes, views: obj.views,
            date: obj.date
        }, async (err, result) => {
            if (err) throw err;

            let { image } = req.body;
            let name = `${Math.random() * 10000000000000000}.png`

            if (image) {
                try {
                    await saveImage(name, image, result._id, 'news_dp');
                } catch (error) {
                    console.log(error);
                }
            }

            else res.json({ status: "Success", message: "News successfully created!!!", data: result })
        })
    },
    getById: (req, res, next) => {
        newsModel.findById(req.params.newsId, (err, result) => {
            console.log(result)

            if (err) throw err
            else res.json({ status: "Success", message: "News found", data: result })
        })
    },
    getAll: (req, res, next) => {
        const newsList = [];
        newsModel.find({}, (err, result) => {
            console.log(result)
            if (err) throw err
            else
                for (let news of result) {
                    console.log(news)
                    newsList.push({
                        id: news.id, title: news.title, category: news.category,
                        content: news.content, author: news.author, news_dp: news.news_dp,
                        likes: news.likes, views: news.views, comments: news.comments,
                        date_created: news.date_created
                    })
                }
            res.json({ status: "Success", message: "News list found!!!", data: newsList })
        })
    },
    updateById: (req, res, next) => {
        const obj = req.body
        console.log("Update from back", obj)
        newsModel.findOneAndUpdate(req.params.newsId, {
            title: obj.title, category: obj.category,
            content: obj.content, author: obj.author

        }, (err, result) => {
            console.log("Update result", result)
            if (err) throw err
            else res.json({ status: "Success", statuscode: 200, message: "News updated successfully!!!", data: result })
        })
    },
    deleteById: (req, res, next) => {
        newsModel.findOneAndDelete(req.params.newsId, (err, result) => {
            if (err) throw err
            else res.json({ status: "Success", message: "News deleted successfully!!!", data: result })
        })
    },

    createImage: async (req, res, next) => {
        try {
            let imageFile = req.body.image;
            let user_id = req.body.newsid
            imageFile = imageFile.replace(/^data:image\/[a-z]+;base64,/, "");
            //  console.log("ImageFile()=>", imageFile); 
            let name = `${Math.random().toString(36).slice(-5)}.png`
            let response = await saveImage(name, imageFile, newsid, 'news_dp');
            res.json(response);
        } catch (error) {
            console.log(error)
        }

    }
}