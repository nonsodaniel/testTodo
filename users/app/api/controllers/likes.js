const LikesModel = require('../models/likes')
module.exports = {
    like: (req, res, next) => {
        LikesModel.create({ likes: req.body.likes, posted_by: req.body.posted_by }, (err, likes) => {
            console.log("likes body", likes)
            if (err) throw err
            else res.json({ status: "Success", message: "likes Successfully created", data: likes })
        })
    },
    getById: (req, res, next) => {
        console.log(req.body);
        LikesModel.findById(req.params.likesId, (err, catInfo) => {
            if (err) throw err
            else res.json({ status: "Success", message: "likes found", statuscode: 200, data: catInfo })
        })
    },
    getAll: (req, res, next) => {
        LikesModel.find({}, (err, catInfo) => {
            if (err) throw err
            else
                res.json({ status: "Success", message: "All likess found!", statuscode: 200, data: catInfo })
        })
    },
    updateById: (req, res, next) => {
        LikesModel.findOneAndUpdate(req.params.likesId, { likes: req.body.likes }, (err, catInfo) => {
            if (err) throw err
            else res.json({ status: "Success", message: "likes successfully updated", statuscode: 200, data: catInfo })
        })
    },
    deleteById: (req, res, next) => {
        LikesModel.findByIdAndRemove(req.params.likesId, (err, catInfo) => {
            if (err) throw err
            else res.json({ status: "Success", message: "likes successfully deleted", statuscode: 200, data: catInfo })
        })
    }
}