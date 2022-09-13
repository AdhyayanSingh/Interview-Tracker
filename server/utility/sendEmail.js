const nodemailer = require('nodemailer');
const dotenv = require('dotenv');


dotenv.config({
    path: '../config.env'
});

const sendEmail = async (options) => {

    let defaultTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // let transport = await nodemailer.createTransport({
    //     host: "smtp.mailtrap.io",
    //     port: 2525,
    //     auth: {
    //         user: "2d420df86737ae",
    //         pass: "6e1945e3127948"
    //     }
    // });

    await defaultTransport.sendMail({
        from: process.env.EMAIL,
        to: options.email,
        subject: options.subject,
        html: options.message,
    },(error, value) => {
        if (error) {
            console.log(error);
        } else {
            console.log(value);
        }
    });
}

module.exports = sendEmail;