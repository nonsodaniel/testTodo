const categoryModel = require('../models/category')
module.exports = {
    create: (req, res, next) => {
        categoryModel.create({ name: req.body.name, code: req.body.code }, (err, category) => {
            if (err) throw err
            else res.json({ status: "Success", message: "Category Successfully created", data: category })
        })
    },
    getById: (req, res, next) => {
        console.log(req.body);
        categoryModel.findById(req.params.categoryId, (err, catInfo) => {
            if (err) throw err
            else res.json({ status: "Success", message: "Category found", statuscode: 200, data: catInfo })
        })
    },
    getAll: (req, res, next) => {
        let categoryList = [];
        categoryModel.find({}, (err, catInfo) => {
            if (err) throw err
            else
                // for (let category of catInfo) {
                //     categoryList.push({ id: category.id, name: category.name, code: category.code, date: category.date_created })
                // }
                res.json({ status: "Success", message: "All categories found", statuscode: 200, data: catInfo })
        })
    },
    updateById: (req, res, next) => {
        categoryModel.findOneAndUpdate(req.params.categoryId, { name: req.body.name, code: req.body.code }, (err, catInfo) => {
            if (err) throw err
            else res.json({ status: "Success", message: "Category successfully updated", statuscode: 200, data: catInfo })
        })
    },
    deleteById: (req, res, next) => {
        categoryModel.findByIdAndRemove(req.params.categoryId, (err, catInfo) => {
            if (err) throw err
            else res.json({ status: "Success", message: "Category successfully deleted", statuscode: 200, data: catInfo })
        })
    }
}