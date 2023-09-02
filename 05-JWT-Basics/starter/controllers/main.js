// Import required modules
const jwt = require('jsonwebtoken');  // For JWT creation and verification
const CustomAPIError = require('../errors/custom-error');  // For custom error handling

// Asynchronous function to handle login logic - POST
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) { throw new CustomAPIError('Please enter a username and password', 400); }

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
    // Extract the 'Authorization' header from the request
    const { authorization: authHeader } = req.headers;

    // Check if the Authorization header exists and starts with 'Bearer'
    if (!authHeader || !authHeader.startsWith('Bearer')) { throw new CustomAPIError('No Token provided', 401); }

    // Extract the actual token from the Authorization header
    const token = authHeader.split(' ')[1];

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Generate a random lucky number for the user
        const luckyNumber = Math.floor(Math.random() * 100);

        // Respond with a welcome message and the lucky number
        res.status(200).json({
            msg: `Welcome ${decoded.username}`,
            secret: `Here is your authorized data, your lucky number is: ${luckyNumber}`
        });

    } catch (error) {
        // Throw a custom error with a 401 status code if token verification fails
        throw new CustomAPIError('Not authorised to access this route', 401);
    }
};

// Export the login and dashboard functions for use in other modules
module.exports = { login, dashboard };
