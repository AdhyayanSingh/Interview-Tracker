const Err = require('../utility/error');
const Comment = require('../models/commentModel');
const aEH = require('../utility/asyncErrorHandler');
const Question = require('../models/questionModel');


exports.getAllComment = aEH(async (req, res, next) => {
    const comments = await Comment.find();
    res.status(200).json({
        status: 'success',
        comments
    });
});

exports.getComment = aEH(async (req, res, next) => {
    const id = req.params.id;
    const comment = await Comment.findById(id);
    res.status(200).json({
        status: 'success',
        comment
    })
})

exports.comment = aEH(async (req, res, next) => {
    const { text } = req.body;
    const { id } = req.params;
    const { user } = req;
    if (!text) return next(new Err('Comment text is required'));
    const comment = await Comment.create({ text, question: id, user: user.id, date: new Date() });
    res.status(200).json({
        status: 'success',
        comment
    })
});

exports.deleteComment = aEH(async (req, res, next) => {
    const { user } = req;
    const { id } = req.params;
    let comment = await Comment.findById(id);
    if (user.id !== comment.user.id) {
        return next(new Err('Forbidden', 403));
    }
    await Comment.findByIdAndDelete(id);
    res.status(200).json({
        status: 'success',
    });
});