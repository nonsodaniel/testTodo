const express = require('express');
const router = express.Router();
const newsControllers = require('../app/api/controllers/news');

router.post('/', newsControllers.create);
router.get('/', newsControllers.getAll);
router.get('/:newsId', newsControllers.getById);
router.put('/:newsId', newsControllers.updateById);
router.delete('/:newsId', newsControllers.deleteById)

module.exports = router