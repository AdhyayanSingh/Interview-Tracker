const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Enter Username"],
        unique: [true, "Username taken."]
    },
    password: {
        type: String,
        required: [true, "Enter Password"],
        minLength: 8,
        select: false
    },
    email: {
        type: String,
        required: [true, "Enter Email"],
        unique: [true, "Email exists in DB"],
        validate: [validator.isEmail, "Enter valid Email"]
    },
    photo: {
        type: String,
        default: "default.jpg"
    },
    passwordChangeToken: {
        type: String,
        select: false
    },
    solved: [{
        type: mongoose.Schema.ObjectId,
        ref: 'question'
    }],
    problemsets: [{
        type: mongoose.Schema.ObjectId,
        ref: 'problemSet'
    }],
    friends: [{
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    }],
    friendRequests: [{
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    }],
    // likedproblemsets: [{
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'problemset'
    // }],
    versionKey: false
});

userSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'problemsets',
    });

    this.populate({
        path: 'friends',
        select: '-friends'
    });

    this.populate({
        path: 'friendRequests',
        select: '-friendRequests'
    })

    next();
});



userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model('user', userSchema);
module.exports = User;