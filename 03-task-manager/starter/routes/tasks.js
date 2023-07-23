const express = require('express');
// require routes method from express
const router = express.Router();

// Tasks Controller - to handle specific actions for tasks route
const { getAllTasks, createTask, getTask, updateTask, deleteTask} = require('../controllers/tasks')

//All tasks routes - attaching the controller functions
router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

//Export file/routes
module.exports = router;