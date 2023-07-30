// Required dependencies
const express = require('express'); // Import Express library
const app = express(); // Create an instance of the Express application

const tasks = require('./routes/tasks'); // Import routes for tasks from a 'tasks.js' file

// Connect to the database using a function from 'db/connect.js'
let connectDB = require('./db/connect');
require('dotenv').config(); // Load environment variables from '.env' file for database configuration

// Middleware 
app.use(express.json()); // Parse incoming request body as JSON

// Serve static files (like HTML, CSS, JS) from the 'public' directory
app.use(express.static('./public'));

// API Routes
// Delegate requests starting with '/api/v1/tasks' to the 'tasks' router we imported
app.use('/api/v1/tasks', tasks);

// Handle all other unspecified routes with a 404 error page
app.all('*', (req, res) => { res.status(404).send(`<h1>${res.statusCode} Page Not Found </h1>`); });

const port = 3000; // Define the port number the server will listen on

const start = async () => {
    try {
        // Extract database credentials from environment variables
        const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DBNAME } = process.env;

        // Construct the MongoDB connection string
        const connectionString = `mongodb+srv://${encodeURIComponent(
            MONGO_USERNAME
        )}:${encodeURIComponent(MONGO_PASSWORD)}@nodeexpressjstutorial.cyqm3ex.mongodb.net/${MONGO_DBNAME}?retryWrites=true&w=majority`;

        // Connect to the database
        await connectDB(connectionString);

        // Start the Express server on the specified port
        app.listen(port, () => { console.log(`Server is listening on port ${port}....`); });

    } catch (error) {
        // Log any errors from starting the server or connecting to the database
        console.log('error from start async function app.js', error);
    }
}
start(); // Start the application
