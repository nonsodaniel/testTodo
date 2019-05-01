const express = require('express');
const router = express.Router();
const likesController = require('../app/api/controllers/likes');


router.post('/', likesController.like)
router.get('/', likesController.getAll);
router.get('/:commentId', likesController.getById);
router.delete('/:likesId', likesController.unlike)

module.exports = router