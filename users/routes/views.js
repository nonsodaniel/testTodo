const express = require('express');
const router = express.Router();
const viewsController = require('../app/api/controllers/views');


router.post('/', viewsController.view)
router.get('/', viewsController.getAll);

module.exports = router