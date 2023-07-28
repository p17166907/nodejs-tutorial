// Require the model for tasks. This line imports the Mongoose model for the 'Task' collection.
const Task = require('../models/Task');

// Controller functions for handling tasks:

// This function handles the request to get all tasks.
// It sends a response with status 200 and a simple message indicating that all tasks are listed here.
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({ tasks });
    } catch (error) { res.status(500).json({ msg: error }) }

};

// This function handles the request to create a new task.
// It uses an async function and awaits the Task model's 'create' method to insert a new task into the database based on the data in 'req.body'.
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    } catch (error) { res.status(500).json({ msg: error }) }

};


// This function handles the request to get a specific task by its ID.
// It sends a response with status 200 and a JSON object containing the 'id' parameter from the request parameters.
const getTask = async (req, res) => {
    try {
        // Extract the 'id' parameter from the request parameters
        const { id: taskId } = req.params;
        // Find the task with the specified '_id' in the database
        const task = await Task.findOne({ _id: taskId });
        //if no task id from param matching _id in database
        if (!task) { return res.status(404).json({ error: 'Task not found' }); }
        // If the task is found, send a response with status 200 and the task object as JSON
        res.status(200).json({ task });
    } catch (error) { res.status(500).json({ error: 'Internal server error' }); }
};
// This function handles the request to update a specific task by its ID.
// It sends a response with status 200 and a simple message indicating that the task is being updated.
const updateTask = (req, res) => {
    res.status(200).send('Updating task here.....');
};

// This function handles the request to delete a specific task by its ID.
// It sends a response with status 200 and a simple message indicating that the task is being deleted.
const deleteTask = (req, res) => {
    res.status(200).send('Deleting task here.....');
};

// Export the controller functions so they can be used in other parts of the application.
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
};
