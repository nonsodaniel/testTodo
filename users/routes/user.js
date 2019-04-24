const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/user')

router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate)
router.get('/', userController.getAll);
router.get('/:userId', userController.getById);
router.put('/:userId', userController.updateById);
router.delete('/:userId', userController.deleteById);

module.exports = router;