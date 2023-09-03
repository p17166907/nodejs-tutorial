const jwt = require('jsonwebtoken');  // For JWT creation and verification
const {UnauthenticatedError} = require('../errors');  // For custom error handling

const authenticationMiddleware = async (req, res, next) => {
    // Extract the 'Authorization' header from the request
    const { authorization: authHeader } = req.headers;

    // Check if the Authorization header exists and starts with 'Bearer'
    if (!authHeader || !authHeader.startsWith('Bearer')) { throw new UnauthenticatedError('No Token provided'); }

    // Extract the actual token from the Authorization header
    const token = authHeader.split(' ')[1];
    // console.log(req.headers.authorization);

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, username } = decoded

        req.user = { id, username }

        next();

    } catch (error) { throw new UnauthenticatedError('Not authorised to access this route'); }

};

module.exports = { authenticationMiddleware }