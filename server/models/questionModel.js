const mongoose = require('mongoose');
const questionSchema = mongoose.Schema({
    title: {
        type: String,
    },
    topic: {
        type: String,
    },
    index: {
        type: Number,
    },
    link: {
        type: String,
        required: [true, 'Enter Link'],
    },
    description: {
        type: String,
    },
    versionKey: false
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

questionSchema.virtual('comments', {
    ref: 'comment',
    foreignField: 'question',
    localField: '_id',
});

const Question = mongoose.model('question', questionSchema);
module.exports = Question;