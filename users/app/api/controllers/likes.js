const LikesModel = require('../models/likes')
module.exports = {
    like: async (req, res, next) => {
        let reqs = req.body;
        await LikesModel.create({ userId: reqs.userId, newsId: reqs.newsId }, (err, likes) => {
            console.log("likes body", likes)
            if (err) throw err
            res.json({ status: "Success", message: "Likes Successfully created", data: likes })
        })
    },

    unlike: async (req, res, next) => {
        await LikesModel.findByIdAndRemove(req.params.likesId, (err, likesInfo) => {
            if (err) throw err
            else res.json({ status: "Success", message: "likes successfully deleted", statuscode: 200, data: likesInfo })
        })
    },

    getById: (req, res, next) => {
        console.log(req.body);
        LikesModel.findById(req.params.likesId, (err, likesInfo) => {
            if (err) throw err
            else res.json({ status: "Success", message: "likes found", statuscode: 200, data: likesInfo })
        })
    },
    getAll: (req, res, next) => {
        LikesModel.find({}, (err, likesInfo) => {
            if (err) throw err
            else
                res.json({ status: "Success", message: "All likess found!", statuscode: 200, data: likesInfo })
        })
    },

}