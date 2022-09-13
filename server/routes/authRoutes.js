const express = require('express');
const multer = require('multer');
const router = express.Router();
const authController = require('../controller/authController');

router.get('/getuser', authController.getUser);
router.post('/login', authController.logIn);
router.post('/forgotpassword', authController.forgotPassword);
router.post('/signup', authController.signUp);
router.post('/changepassword', authController.isLoggedIn, authController.changePassword);
router.post('/logout', authController.isLoggedIn, authController.logOut);
router.post('/resetpassword/:token', authController.resetPassword);
router.post('/updateme', authController.isLoggedIn, authController.updatePhoto, authController.updateMe);

module.exports = router;