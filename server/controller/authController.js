const Err = require("../utility/error");
const User = require("../models/userModel");
const aEH = require("../utility/asyncErrorHandler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utility/sendEmail");
const multer = require("multer");
const { ProblemSet } = require("../models/personalProblemSetModel");

const jwtToCookie = (user, status, res) => {
    const token = jwt.sign({ id: user.id }, process.env.SECRETKEY);
    const cookieOptions = {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
    };
    user.password = undefined;
    res.cookie("jwt", token, cookieOptions);
    res.status(status).json({
        status: "Success",
        token,
        user,
    });
};

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/user/");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        let name = req.user.id;
        if (!name) {
            cb(new Err("Something went wrong", 400), false);
        }
        cb(null, `${name}_${Date.now()}.${ext}`);
    },
});

const multerFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith("image")) {
        cb(new Err("Not an image", 400), false);
    } else {
        cb(null, true);
    }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.updatePhoto = upload.single("photo");

exports.updateMe = aEH(async (req, res, next) => {
    let username = req.body.username || req.user.username;
    let email = req.body.email || req.user.email;
    let photo;
    if (req.file) {
        photo = req.file.filename;
    }
    if (!photo) {
        photo = req.user.photo;
    }

    await User.findByIdAndUpdate(req.user.id, { email, username, photo });
    res.status(200).json({
        photo: photo,
        status: "success",
    });
});

exports.signUp = aEH(async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword)
        next(new Err("Passwords do not match", 400));
    const list = await ProblemSet.create({ name: "Favorites" });
    let list1 = [];
    list1.push(list.id);
    const newUser = await User.create({
        username,
        password,
        email,
        problemsets: [...list1],
    });
    const user = await User.findById(newUser.id);
    jwtToCookie(user, 201, res);
});

exports.logIn = aEH(async (req, res, next) => {
    const { query, password } = req.body;
    let user =
        (await User.findOne({ username: query }).select("+password")) ||
        (await User.findOne({ email: query }).select("+password"));

    if (user && (await bcrypt.compare(password, user.password)))
        jwtToCookie(user, 200, res);
    else next(new Err("Username or password invalid", 400));
});

exports.forgotPassword = aEH(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new Err("User not found!!", 404));

    let token = `${user.id}${Date.now()}${Math.round(Math.random() * 10000000)}`;

    user.passwordChangeToken = token;
    await user.save({ validateBeforeSave: false });

    // const link = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${token}`;
    const link = `${req.protocol}://localhost:3000/forgotpassword/token/${token}`;
    console.log(link);

    try {
        const options = {
            email: user.email,
            subject: "Reset Password link",
            message: `Click <a href = "${link}">here</a> to reset your Interview Tracker account password. <br> Ignore if you didn't request a password change.`,
        };
        await sendEmail(options);
        res.status(200).json({
            status: "success",
            message: "Mail sent",
        });
    } catch (err) {
        user.passwordChangeToken = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new Err("Something went wrong. Please try again later.", 500));
    }
});

exports.isLoggedIn = aEH(async (req, res, next) => {
    let token;
    if (
        req.headers.Authorization &&
        req.headers.Authorization.startsWith("Bearer")
    ) {
        token = req.headers.Authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) return next(new Err("Not logged in"), 400);
    let jsonPayload = await jwt.verify(token, process.env.SECRETKEY);
    const user = await User.findById(jsonPayload.id);
    if (!user) return next(new Err("User does not exist", 400));
    req.user = user;
    next();
});

exports.changePassword = aEH(async (req, res, next) => {
    const { currPassword, newPassword, confirmNP } = req.body;
    if (newPassword !== confirmNP) next(new Err("Passwords do not match"), 400);
    const user = await User.findById(req.user.id).select("+password");
    if (await bcrypt.compare(newPassword, user.password))
        next(new Err("New password cannot be old password"), 400);
    if (await bcrypt.compare(currPassword, user.password)) {
        user.password = newPassword;
        await user.save();
    }
    jwtToCookie(user, 200, res);
});

exports.resetPassword = aEH(async (req, res, next) => {
    const { newPassword, confirmNP } = req.body;
    if (newPassword !== confirmNP) next(new Err("Passwords do not match"), 400);
    console.log(req.params.token);
    const user = await User.findOne({
        passwordChangeToken: req.params.token,
    }).select("+passwordChangeToken");

    if (!user) return next(new Err("Something went wrong", 400));

    user.password = newPassword;
    user.passwordChangeToken = undefined;
    await user.save();

    jwtToCookie(user, 200, res);
});

exports.logOut = (req, res, next) => {
    res.cookie("jwt", "");
    res.status(200).json({
        messsage: "Logged out",
    });
};

exports.getUser = async (req, res, next) => {
    let token;
    if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    let user = null;
    let user1 = null;
    if (token) {
        try {
            let jsonPayload = await jwt.verify(token, process.env.SECRETKEY);
            user1 = await User.findById(jsonPayload.id);
        } catch (err) { }
    }
    if (user1) {
        user = user1;
    }
    res.status(200).json({
        user,
    });
};
