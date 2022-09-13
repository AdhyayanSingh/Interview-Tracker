const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'This field cannot be empty']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    question: {
        type: mongoose.Schema.ObjectId,
        ref: 'question'
    },
    date: {
        type: Number,
        default: new Date()
    },
    versionKey: false
}, {
    toObject: { virtuals: true },
    toJson: { virtuals: true }
});

commentSchema.pre(/^find/, function (next) {

    this.populate({
        path: 'user',
        select: '-solved -problemsets -friendRequests -friends -email -__v'
    });

    next();
});


const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;