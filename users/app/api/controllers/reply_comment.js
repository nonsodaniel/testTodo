const Reply_commentModel = require('../models/reply_comment')
module.exports = {
    create: (req, res, next) => {
        let reqs = req.body;
        Reply_commentModel.create({
            newsId: reqs.newsId, commentId: reqs.commentId,
            comment: reqs.comment,  posted_by: reqs.posted_by        
        }, (err, comment) => {
            console.log("Comment body", comment)
            if (err) throw err
            else res.json({ status: "Success", statuscode: 200, message: "Comment Successfully created", data: comment })
        })
    },
    getById: (req, res, next) => {
        console.log(req.body);
        Reply_commentModel.findById(req.params.commentId, (err, catInfo) => {
            if (err) throw err
            else res.json({ status: "Success", message: "comment found", statuscode: 200, data: catInfo })
        })
    },
    getAll: (req, res, next) => {
        Reply_commentModel.find({}, (err, catInfo) => {
            if (err) throw err
            else
                res.json({ status: "Success", message: "All Comments found!", statuscode: 200, data: catInfo })
        })
    },
    updateById: (req, res, next) => {
        Reply_commentModel.findOneAndUpdate(req.params.commentId, { comment: req.body.comment }, (err, catInfo) => {
            if (err) throw err
            else res.json({ status: "Success", message: "comment successfully updated", statuscode: 200, data: catInfo })
        })
    },
    deleteById: (req, res, next) => {
        Reply_commentModel.findByIdAndRemove(req.params.commentId, (err, catInfo) => {
            if (err) throw err
            else res.json({ status: "Success", message: "comment successfully deleted", statuscode: 200, data: catInfo })
        })
    }
}