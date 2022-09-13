const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authController = require('../controller/authController');

router.use(authController.isLoggedIn);
router.get('/', userController.getAllUsers);
router.get('/:username', userController.getUser);
router.post('/updatesolved/:questionid', userController.updateSolved);
router.post('/createproblemset', userController.createProblemSet);
router.post('/addproblem/:id', userController.addToProblemSet);
router.post('/friendrequests/:id', userController.friendRequests);
router.post('/addfriend/:id', userController.addFriend);
router.post('/removefriend/:id', userController.removeFriend);
router.post('/addtofavorite', userController.addToFavorite);
router.delete('/list/:id', userController.deleteList);
router.delete('/listitem/:id', userController.deleteListItem);
router.post('/cancelrequest/:id', userController.cancelFriendRequest);
router.post('/togglepp/:id', userController.togglepp);
// router.post('/like/:id', userController.likeProblemSet);

module.exports = router;