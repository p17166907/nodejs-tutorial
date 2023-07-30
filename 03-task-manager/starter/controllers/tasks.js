// Import the Task model from the 'models' folder to interact with the 'Task' database collection.
const Task = require('../models/Task');

// Define controller functions for CRUD operations on tasks:

// Retrieve a list of all tasks.
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({}) // Fetch all tasks from the database.
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ msg: error }); // Handle any database errors.
    }
};

// Create a new task entry in the database.
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body); // Insert the new task.
        res.status(201).json({ task }); // Return the created task.
    } catch (error) {
        res.status(500).json({ msg: error }); // Handle any validation or database errors.
    }
};

// Retrieve a task by its ID.
const getTask = async (req, res) => {
    try {
        const { id: taskId } = req.params; // Extract task ID from request parameters.
        const task = await Task.findOne({ _id: taskId }); // Fetch the specified task.
        if (!task) { return res.status(404).json({ error: 'Task not found' }); }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' }); // Handle any database errors.
    }
};

// Update an existing task by its ID.
const updateTask = async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true, // Return the updated task.
        runValidators: true, // Validate the data before updating.
    });
    if (!task) { return res.status(404).json({ error: 'Task not found' }); }
    res.status(200).json({ task });
}

// Delete a task by its ID.
const deleteTask = async (req, res) => {
    try {
        const { id: taskId } = req.params; // Extract task ID from request parameters.
        const task = await Task.findOneAndDelete({ _id: taskId }); // Delete the specified task.
        if (!task) { return res.status(404).json({ error: 'Task not found' }); }
        res.status(200).json({ task }); // Return the deleted task.
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' }); // Handle any database errors.
    }
};

// Export the controller functions to be imported elsewhere (e.g., in routes).
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
};
