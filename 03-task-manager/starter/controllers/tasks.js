
// All tasks + CRUD + REST (get, post, put/patch, delete)
const getAllTasks = (req, res) => { res.status(200).send('All tasks listed here.....') }

const createTask = (req, res) => { res.status(200).json({ msg: 'Success', data: req.body }) }

const getTask = (req, res) => { res.status(200).json({ id: req.params.id }) }

const updateTask = (req, res) => { res.status(200).send('Updating task here.....') }

const deleteTask = (req, res) => { res.status(200).send('Deleting task here.....') }




module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask, }