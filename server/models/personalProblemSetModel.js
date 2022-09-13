const mongoose = require('mongoose');
const problemSchema = mongoose.Schema({
    title: {
        type: String,
    },
    topic: {
        type: String,
    },
    link: {
        type: String,
        required: [true, 'Enter Link'],
    },
    description: {
        type: String
    },
    versionKey: false
});

const problemSetSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter Name'],
    },
    public: {
        type: Boolean,
        default: false
    },
    list: [{
        type: mongoose.Schema.ObjectId,
        ref: 'problem'
    }],
    likes: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    versionKey: false
});

problemSetSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'list',
    });
    next();
});

const Problem = mongoose.model('problem', problemSchema);
const ProblemSet = mongoose.model('problemSet', problemSetSchema);
module.exports = { ProblemSet, Problem };