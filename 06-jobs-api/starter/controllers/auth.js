// Import User model for database operations
const User = require('../models/User');

// Import HTTP status codes
const { StatusCodes } = require('http-status-codes');

// Import custom error classes for bad requests and unauthenticated requests
const { BadRequestError, UnauthenticatedError } = require('../errors');

/**
 * Create a new user and return user data with a JWT token.
 * 
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON object containing user data and JWT token.
 * @throws {BadRequestError} When user creation fails.
 */
async function register(req, res, next) {
    // Create a new user in the database
    const user = await User.create({ ...req.body });
    let { _id, name, email, createdAt, updatedAt, __v } = user;
    // Generate a JWT token for the new user
    const token = await user.createJWT();
    // Respond with the newly created user and a status code
    res.status(StatusCodes.CREATED).json({ user: { _id, name, email, createdAt, updatedAt, __v }, token });

}

/**
 * Authenticate a user and return user data with a JWT token.
 * 
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON object containing user data and JWT token.
 * @throws {BadRequestError} When email or password is missing.
 * @throws {UnauthenticatedError} When authentication fails.
 */
async function login(req, res) {
    try {
        // Destructure email and password from request body
        const { email, password } = req.body;

        // Check for missing email or password
        if (!email || !password) { throw new BadRequestError('Provide email and password'); }

        // Attempt to find the user by email
        const user = await User.findOne({ email });

        // If user is not found, throw an Unauthenticated error
        if (!user) { throw new UnauthenticatedError('Invalid Credentials'); }

        // Verify the password using the comparePassword method on the user model
        const isPasswordCorrect = await user.comparePassword(password);

        // If password is incorrect, throw an Unauthenticated error
        if (!isPasswordCorrect) { throw new UnauthenticatedError('Invalid Credentials'); }

        // Generate JWT token for the authenticated user
        const token = await user.createJWT();

        // Destructure relevant user properties for the response
        const { _id, name, createdAt, updatedAt, __v } = user;

        // Send successful response with user data and token
        res.status(StatusCodes.OK).json({ user: { _id, name, email, createdAt, updatedAt, __v }, token });

    } catch (error) {
        // Handle specific errors
        if (error instanceof BadRequestError || error instanceof UnauthenticatedError) {
            throw error;
        }
        // For any other errors, assume authentication failed
        else {
            throw new UnauthenticatedError('Authentication failed');
        }
    }
}


// Export the register and login functions to use them in other modules
module.exports = { register, login };


