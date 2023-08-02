const express = require('express')
const app = express()

//import Routes for product
const {router: productRouter} = require('./routes/products')


// Connect to the database using a function from 'db/connect.js'
let connectDB = require('./db/connect');
require('dotenv').config(); // Load environment variables from '.env' file for database configuration

//middleware
app.use(express.json())

//Routes
app.get('/', (req, res) => {
    res.status(200).send(`<h1>Store APi</h1><br><a href="/api/v1/products">products route</a>`)
})
//Delegate requests starting with '/api/v1/tasks' to the 'tasks' router we imported
app.use('/api/v1/products', productRouter)



//Products routes
// ... [Add your product routes here]

// Error handling middleware should be added AFTER all other routes and middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000

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

start()
