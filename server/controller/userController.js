const User = require('../models/userModel');
const aEH = require('../utility/asyncErrorHandler');
const Err = require('../utility/error');
const Question = require('../models/questionModel');
const { ProblemSet, Problem } = require('../models/personalProblemSetModel');


exports.getAllUsers = aEH(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        status: 'success',
        users
    });
});

exports.getUser = aEH(async (req, res, next) => {
    let user = await User.findOne({ username: req.params.username });
    if (!user) return next(new Err('User does not exist', 400));
    res.status(200).json({
        status: 'success',
        user
    });
});

exports.updateSolved = aEH(async (req, res, next) => {
    let qid = req.params.questionid;
    const question = await Question.findById(qid);
    if (!question) {
        return next(new Err('Invalid Question ID', 400));
    }
    let solved = req.user.solved;
    if (solved.find(e => e == qid)) {
        solved = solved.filter(e => e != qid);
    } else {
        solved.push(qid);
    }
    await User.findByIdAndUpdate(req.user.id, { solved });
    res.status(200).json({
        status: 'success'
    });
});

exports.createProblemSet = aEH(async (req, res, next) => {
    const { name, public, description } = req.body;
    if (!name) return next(new Err('Enter Name', 400));
    const user = req.user;
    const problemSet = await ProblemSet.create({ name, public, description });
    let arr = user.problemsets || [];
    arr.push(problemSet.id);
    const updatedProblemSet = await User.findByIdAndUpdate(user.id, { problemsets: arr }, { new: true },).populate('problemsets');
    res.status(200).json({
        status: 'success',
        updatedProblemSet
    });
});

exports.addToProblemSet = aEH(async (req, res, next) => {
    const id = req.params.id;
    const { title, topic, link, description } = req.body;
    if (!link) return next(new Err('Enter Link', 400));
    const problemSet = await ProblemSet.findById(id);
    const problem = await Problem.create({ title, topic, link, description });
    let arr = problemSet.list || [];
    arr.push(problem.id);
    await ProblemSet.findByIdAndUpdate(id, { list: arr });
    res.status(200).json({
        status: 'success',
        problem
    });
});

exports.friendRequests = aEH(async (req, res, next) => {
    const { action } = req.body;
    if (action !== 'accept' && action !== 'reject') next(new Err('Invalid Action', 400));
    let friendReq = req.user.friendRequests;
    let friends = req.user.friends;
    if (action === 'accept') {
        friends.push(req.params.id);
        let user2 = await User.findById(req.params.id);
        if (!user2) next(new Err('User does not exist', 400));
        await User.findByIdAndUpdate(req.params.id, { friends: [...user2.friends, req.user.id] });
    }
    friendReq = friendReq.filter(e => e._id != req.params.id);
    await User.findByIdAndUpdate(req.user.id, { friends, friendRequests: friendReq });
    res.status(200).json({
        status: 'success',
    });
});

exports.addFriend = aEH(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) next(new Err('User does not exist', 400));
    let friendReq = user.friendRequests;
    if (friendReq.find(e => e._id == req.user.id)) friendReq = friendReq.filter(e => e._id != req.user.id);
    else friendReq.push(req.user.id);
    await User.findByIdAndUpdate(req.params.id, { friendRequests: friendReq });
    res.status(200).json({
        status: 'success'
    });
});

exports.removeFriend = aEH(async (req, res, next) => {
    let id1 = req.user.id;
    let id2 = req.params.id;
    let user1 = req.user;
    let user2 = await User.findById(id2);
    let friends1 = user1.friends;
    let friends2 = user2.friends;
    friends1 = friends1.filter(e => e._id != id2);
    friends2 = friends2.filter(e => e._id != id1);
    const user = await User.findByIdAndUpdate(id1, { friends: friends1 }, { new: true });
    await User.findByIdAndUpdate(id2, { friends: friends2 });
    res.status(200).json({
        status: 'success',
        friends: user.friends
    });
});

exports.addToFavorite = aEH(async (req, res, next) => {
    const { link, title, topic } = req.body;
    const newProblem = await Problem.create({ link, title, topic });
    const user = req.user;
    let problemsets = user.problemsets;
    let arr = problemsets.find(el => el.name === 'Favorites');
    const id = newProblem.id;
    arr.list.push(id);
    const problemset = await ProblemSet.findByIdAndUpdate(arr.id, { list: arr.list }, { new: true });

    const usr = await User.findById(user.id);

    problemsets = usr.problemsets;

    res.status(200).json({
        problemsets
    });

});

exports.deleteList = aEH(async (req, res, next) => {
    const id = req.params.id;

    let playlist = await ProblemSet.findById(id);
    playlist.list.forEach(async el => {
        await Problem.findByIdAndDelete(el._id);
    })
    await ProblemSet.findByIdAndDelete(id);
    const usr = await User.findById(req.user.id);
    let problemsets = req.user.problemsets;
    problemsets = problemsets.filter(e => e._id != id);
    const user = await User.findByIdAndUpdate(req.user.id, { problemsets }, { new: true });
    res.status(200).json({
        problemsets: usr.problemsets
    })
});

exports.deleteListItem = aEH(async (req, res, next) => {
    const pid = req.params.id;
    const { sid } = req.body;

    let problemset = await ProblemSet.findById(sid);
    problemsetList = problemset.list.filter(e => e._id != pid);
    const temp = await ProblemSet.findByIdAndUpdate(sid, { list: problemsetList }, { new: true });
    await Problem.findByIdAndDelete(pid);
    const usr = await User.findById(req.user.id);
    req.user = usr;
    res.status(200).json({
        problemsets: usr.problemsets
    })
});


exports.cancelFriendRequest = aEH(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    let friendRequests = user.friendRequests;
    friendRequests = friendRequests.filter(e => e._id != req.user.id);
    await User.findByIdAndUpdate(user._id, { friendRequests });
    res.status(200).json({
        status: 'success'
    })
});

exports.togglepp = aEH(async (req, res, next) => {
    let problemset = await ProblemSet.findById(req.params.id);
    problemset.public = !problemset.public;
    await ProblemSet.findByIdAndUpdate(req.params.id, { public: problemset.public });
    res.status(200).json({
        status: 'success'
    })
})

// exports.likeProblemSet = aEH(async (req, res, next) => {
//     const id = req.params.id;
//     const problemSet = await ProblemSet.findById(id);

// });