const commentModel = require('../models/comments')
module.exports = {
    create: (req, res, next) => {
        commentModel.create({ comment: req.body.comment, author: req.body.author }, (err, comment) => {
            if (err) throw err
            else res.json({ status: "Success", message: "Comment Successfully created", data: comment })
        })
    },
    getById: (req, res, next) => {
        console.log(req.body);
        commentModel.findById(req.params.categoryId, (err, catInfo) => {
            if (err) throw err
            else res.json({ status: "Success", message: "Category found", statuscode: 200, data: catInfo })
        })
    },
    getAll: (req, res, next) => {
        let categoryList = [];
        commentModel.find({}, (err, catInfo) => {
            if (err) throw err
            else
                res.json({ status: "Success", message: "All categories found", statuscode: 200, data: catInfo })
        })
    },
    updateById: (req, res, next) => {
        commentModel.findOneAndUpdate(req.params.categoryId, { name: req.body.name, code: req.body.code }, (err, catInfo) => {
            if (err) throw err
            else res.json({ status: "Success", message: "Category successfully updated", statuscode: 200, data: catInfo })
        })
    },
    deleteById: (req, res, next) => {
        commentModel.findByIdAndRemove(req.params.categoryId, (err, catInfo) => {
            if (err) throw err
            else res.json({ status: "Success", message: "Category successfully deleted", statuscode: 200, data: catInfo })
        })
    }
}