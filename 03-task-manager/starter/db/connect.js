// require mongoose to access db
const mongoose = require('mongoose');

const connectDB = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    }).then(() => console.log('CONNECTED TO THE DB.....')).catch((error) => console.log(error));
}

module.exports = connectDB;
