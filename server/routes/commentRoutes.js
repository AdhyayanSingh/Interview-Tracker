const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');
const authController = require('../controller/authController');

router.get('/', commentController.getAllComment);
router.get('/:id', commentController.getComment);
router.post('/:id/comment', authController.isLoggedIn, commentController.comment);
router.delete('/:id/comment', authController.isLoggedIn, commentController.deleteComment);

module.exports = router;