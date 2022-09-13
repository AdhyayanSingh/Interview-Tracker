const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const port = 4000;

const server = app.listen(port, () => {
    console.log("Hello from the server side...");
});

process.on('uncaughtException', (err, origin) => {
    console.log('Caught exception: ', err, 'Exception origin: ', origin);
    server.close();
});

dotenv.config({
    path: './config.env'
});

const DB = process.env.DB.replace('<password>', process.env.PASSWORD);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB connection successful!'))
    .catch(e => {
        console.log(e);
        server.close();
    });

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at: ', promise, 'reason: ', reason);
});