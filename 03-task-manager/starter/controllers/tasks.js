const Task = require('../models/Task'); // Interact with the 'Task' database collection.

// Utility function to handle response and error
const handleResponse = (res, statusCode, data) => {
    if (statusCode >= 400) { return res.status(statusCode).json({ error: data }); }
    return res.status(statusCode).json(data);
};

// Retrieve all tasks.
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        handleResponse(res, 200, { tasks });
    } catch (error) { handleResponse(res, 500, error); }
};

// Create a task.
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        handleResponse(res, 201, { task });
    } catch (error) { handleResponse(res, 500, error); }
};

// Retrieve a task by ID.
const getTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        const task = await Task.findOne({ _id: taskId });
        if (!task) { handleResponse(res, 404, 'Task not found'); return; }
        handleResponse(res, 200, { task });
    } catch (error) { handleResponse(res, 500, 'Internal server error'); }
};

// Update a task by ID.
const updateTask = async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true, // Return the updated task.
        runValidators: true, // Validate the data before updating.
    });
    if (!task) { handleResponse(res, 404, 'Task not found'); return; } handleResponse(res, 200, { task });
}

// Delete a task by ID.
const deleteTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskId });
        if (!task) { handleResponse(res, 404, 'Task not found'); return; }
        handleResponse(res, 200, { task });
    } catch (error) { handleResponse(res, 500, 'Internal server error'); }
};

// Export the controller functions.
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
};
