const commentModel = require('../models/comments')
module.exports = {
    create: (req, res, next) => {
        commentModel.create({ comment: req.body.comment, posted_by: req.body.posted_by }, (err, comment) => {
            console.log("Comment body", comment)
            if (err) throw err
            else res.json({ status: "Success", message: "Comment Successfully created", data: comment })
        })
    },
    getById: (req, res, next) => {
        console.log(req.body);
        commentModel.findById(req.params.commentId, (err, catInfo) => {
            if (err) throw err
            else res.json({ status: "Success", message: "comment found", statuscode: 200, data: catInfo })
        })
    },
    getAll: (req, res, next) => {
        commentModel.find({}, (err, catInfo) => {
            if (err) throw err
            else
                res.json({ status: "Success", message: "All Comments found!", statuscode: 200, data: catInfo })
        })
    },
    updateById: (req, res, next) => {
        commentModel.findOneAndUpdate(req.params.commentId, { comment: req.body.comment }, (err, catInfo) => {
            if (err) throw err
            else res.json({ status: "Success", message: "comment successfully updated", statuscode: 200, data: catInfo })
        })
    },
    deleteById: (req, res, next) => {
        commentModel.findByIdAndRemove(req.params.commentId, (err, catInfo) => {
            if (err) throw err
            else res.json({ status: "Success", message: "comment successfully deleted", statuscode: 200, data: catInfo })
        })
    }
}