// Import the Mongoose library
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


// Define the schema - specifying structure of documents in the collection
const UserSchema = new mongoose.Schema({
    name: {
        type: String, // Corrected to String
        required: [true, 'must provide a name'],
        maxLength: [50, 'name must be less than 50 characters'],
        minLength: [2, 'name must be more than 2 characters']
    },
    email: {
        type: String, // Corrected to String
        required: [true, 'must provide an email'],
        unique: true, // Moved inside email field
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'provide valid email']
    },
    password: {
        type: String, // Corrected to String
        required: [true, 'must provide a password'],
        minLength: [6, 'password must be more than 6 characters']
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function (next) {
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

module.exports = mongoose.model('User', UserSchema);
