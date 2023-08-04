// Load database connection module
let connectDB = require('./db/connect');

// Load environment variables for database configuration
require('dotenv').config();

// Load the product model
const ProductModelSchema = require('./models/product');

// Load products data from JSON file
const jsonProducts = require('./products.json');

const start = async () => {
    try {
        // Extract database credentials from environment variables
        const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DBNAME } = process.env;

        // Construct MongoDB connection string using the credentials
        const connectionString = `mongodb+srv://${encodeURIComponent(
            MONGO_USERNAME
        )}:${encodeURIComponent(MONGO_PASSWORD)}@nodeexpressjstutorial.cyqm3ex.mongodb.net/${MONGO_DBNAME}?retryWrites=true&w=majority`;

        // Establish connection with the database
        await connectDB(connectionString);

        // Delete all products in the database
        await ProductModelSchema.deleteMany();

        // Populate the database with products from JSON file
        await ProductModelSchema.create(jsonProducts);

        // Exit the process with a success code
        process.exit(0);

    } catch (error) {
        // Handle and log any errors
        console.log('error from start async function populate.js', error);
        // Exit the process with an error code
        process.exit(1);
    }
}

// Call the start function to begin the process
start();
