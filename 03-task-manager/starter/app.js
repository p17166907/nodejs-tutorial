// Import the Express module and create an instance of it called 'app'
const express = require('express');
const app = express();

// Import the routes for tasks from a separate file called 'tasks.js'
const tasks = require('./routes/tasks');

// Middleware - Parse incoming JSON data in the request body
app.use(express.json());

// Routes
// Set up a route for the root URL ('/')
// When you visit the home page, the server will respond with "Task Manager App"
app.get('/', (req, res) => {
    res.status(200).send('Task Manager App');
});

// Use the tasks router to handle routes for '/api/v1/tasks'
// Any requests starting with '/api/v1/tasks' will be handled by the 'tasks' router
app.use('/api/v1/tasks', tasks);


//Cath all other routes/pages not handles in our app
app.all('*', (req, res) => { res.status(404).send(`<h1>${res.statusCode} Page Not Found </h1>`); });

const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}....`);
});
