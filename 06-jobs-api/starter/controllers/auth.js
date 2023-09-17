// Import required modules and classes
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const bcrypt = require('bcryptjs');

// Registration function
const register = async (req, res) => {
    const { name, email, password } = req.body;

    // Query DB - Save user to database
    let query = User.create({ ...req.body });

    const user = await query

    // Send back created user and status code
    res.status(StatusCodes.CREATED).json({ user });
};

// Login function (placeholder)
const login = async (req, res) => {
    res.status(StatusCodes.OK).send('login user');
};

// Export the functions for use in other files
module.exports = { register, login };
