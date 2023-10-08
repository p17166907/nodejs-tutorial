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
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}



/**
 * Retrieve a single job.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getJob = async (req, res) => {
    // Implement job retrieval logic here
    res.status(StatusCodes.OK).send('Get Job');
};

/**
 * Create a new job.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

/**
 * Update an existing job.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const updateJob = async (req, res) => {
    // Implement job update logic here
    res.status(StatusCodes.OK).send('Update Job');
};

/**
 * Delete a job.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const deleteJob = async (req, res) => {
    // Implement job deletion logic here
    res.status(StatusCodes.OK).send('Delete Job');
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
