const express = require('express');
const router = express.Router();
const adminController = require('../app/api/controllers/is_admin')



router.post('/register', adminController.create);
router.post('/authenticate', adminController.authenticate)
// router.put('/forgot_password/:adminId', adminController.forgotPassword);
router.put('/:adminId', adminController.updateById);
router.delete('/:adminId', adminController.deleteById);
router.get('/', adminController.getAll)
// router.get('/forgot-password', adminController.forgetPassword_html)
router.post('/forgot-password', adminController.forgotPassword)
router.get('/:adminId', adminController.getById)
// router.post('/adminImage', adminController.createImage)

module.exports = router;