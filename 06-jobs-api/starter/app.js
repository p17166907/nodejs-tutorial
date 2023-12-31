require('dotenv').config();
require('express-async-errors');
//extra security packages
const helmet = require('helmet'); // Helmet helps secure Express apps by setting various HTTP headers
const cors = require('cors'); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS
const xss = require('xss-clean'); // Prevents XSS attacks by sanitizing user input
const rateLimiter = require('express-rate-limit'); // Basic rate-limiting middleware for Express


const express = require('express');
const app = express();

//connect the db
let connectDB = require('./db/connect');
//Load environment variables/db access credentials from '.env' file 
require('dotenv').config(); // Load environment variables from '.env' file for database configuration
// Extract database credentials from environment variables
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DBNAME } = process.env;

const authenticateUser = require('./middleware/authentication')

// Import routes
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Applying security measures
app.set('trust proxy', 1)
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100, }))
app.use(express.json()); // Parse incoming JSON payloads
app.use(helmet())
app.use(cors())
app.use(xss())

// routes
//Api routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // Add/ insert the mongo db credentials with the mongo db connection string
    const connectionString = `mongodb+srv://${encodeURIComponent(
      MONGO_USERNAME
    )}:${encodeURIComponent(MONGO_PASSWORD)}@nodeexpressjstutorial.cyqm3ex.mongodb.net/${MONGO_DBNAME}?retryWrites=true&w=majority`;

    // Connect to the database - connectDB() takes a url string
    await connectDB(connectionString);

    // Start the Express server on the specified port
    app.listen(port, () => { console.log(`Server is listening on port ${port}....`); });

  } catch (error) {

  }
}
start()
