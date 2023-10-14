// Import Job model for database operations
const Job = require('../models/Job');

// Import HTTP status codes
const { StatusCodes } = require('http-status-codes');

// Import custom error classes
const { CustomAPIError, UnauthenticatedError, NotFoundError, BadRequestError } = require('../errors');

/**
 * Retrieve all jobs.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getAllJobs = async (req, res) => {
    try {
        // Find all jobs created by the current user and sort them by createdAt
        const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt');

        // Send a JSON response with the retrieved jobs and count
        res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
    } catch (error) { res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message }); }
};

/**
 * Retrieve a single job.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getJob = async (req, res) => {
    try {
        // Destructure request objects
        const { user: { userId }, params: { id: jobId } } = req;

        // Find the job using the provided parameters
        const job = await Job.findOne({ _id: jobId, createdBy: userId }).sort('createdAt');

        // If the job is not found, throw a NotFoundError
        if (!job) { throw new NotFoundError(`Job with id: ${jobId} not found`); }

        // Send a JSON response with the retrieved job
        res.status(StatusCodes.OK).json({ job });
    } catch (error) { res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message }); }
};

/**
 * Create a new job.
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const createJob = async (req, res) => {
    try {
        // Set the createdBy field in the request body to the current user's userId
        req.body.createdBy = req.user.userId;

        // Create a new job using the request body
        const job = await Job.create(req.body);

        // Send a JSON response with the created job
        res.status(StatusCodes.CREATED).json({ job });
    } catch (error) { res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message }); }
};

/**
 * Update an existing job.
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const updateJob = async (req, res) => {
    try {
        // Destructure request objects
        const { user: { userId }, body: { company, position }, params: { id: jobId } } = req;

        if (company === '' || company === '') { throw new BadRequestError(`Company or Position cannot be empty`); }

        const job = await Job.findByIdAndUpdate({ _id: jobId, createdBy: userId }, req.body, { new: true, runValidators: true })

        // If the job is not found, throw a NotFoundError
        if (!job) { throw new NotFoundError(`Job with id: ${jobId} not found`); }

        // Send a JSON response with the retrieved job
        res.status(StatusCodes.OK).json({ job });
    } catch (error) { res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message }); }
};

/**
 * Delete a job.
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const deleteJob = async (req, res) => {
    try {
        // Implement job deletion logic here

        // Send a success response
        res.status(StatusCodes.OK).send('Delete Job');
    } catch (error) {
        // Handle errors and send an appropriate response
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
