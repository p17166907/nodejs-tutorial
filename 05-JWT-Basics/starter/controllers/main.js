// Import required modules
const jwt = require('jsonwebtoken');  // For JWT creation and verification
const { CustomAPIError, BadRequestError, UnauthenticatedError } = require('../errors');  // For custom error handling

// Asynchronous function to handle login logic - POST
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) { throw new BadRequestError('Please enter a username and password'); }

    // Generate a mock user ID (Note: In a real app, the ID would come from a database)
    const id = new Date().getDate();

    // Create a user object to store ID and username
    let userObj = { id, username };

    // Generate JWT with user information and secret key, set expiration time
    const token = jwt.sign(userObj, process.env.JWT_SECRET, { expiresIn: '30d' });

    // Respond with a 200 status code, message, and the token
    res.status(200).json({ msg: 'user created', userObj, token });
};

// Asynchronous function to handle dashboard information logic - GET
const dashboard = async (req, res) => {
    console.log('From dashboard function: req.user', req.user);
    // Generate a random lucky number for the user
    const luckyNumber = Math.floor(Math.random() * 100);
    // Respond with a welcome message and the lucky number
    res.status(200).json({
        msg: `Welcome ${req.user.username}`,
        secret: `Here is your authorized data, your lucky number is: ${luckyNumber}`
    });

};

// Export the login and dashboard functions for use in other modules
module.exports = { login, dashboard };
