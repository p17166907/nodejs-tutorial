



const getAllJobs = async (req, res) => { res.status(200).send('get All Jobs') }

const getJob = async (req, res) => { res.status(200).send('getJob') }

const createJob = async (req, res) => { res.status(200).send('createJob') }

const updateJob = async (req, res) => { res.status(200).send('updateJob') }

const deleteJob = async (req, res) => { res.status(200).send('delete job') }


module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob}