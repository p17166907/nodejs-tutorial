// Import the product model schema
const ProductModelSchema = require('../models/product');

// Function to retrieve all products from the database statically
const getAllProductsStatic = async (req, res) => {
    try {
        // Fetch all products
        const products = await ProductModelSchema.find({});
        // Send successful response with products data
        res.status(200).json({ msg: 'Success', data: products, nbHits: products.length });
    } catch (error) {
        // Log errors specific to the static products retrieval
        console.error('Error in getAllProductsStatic', error);
    }
};

// Function to retrieve products based on provided query parameters
const getAllProducts = async (req, res) => {
    try {
        // Destructure query parameters
        const { featured, company, name, sort, fields } = req.query;

        // Prepare the query object based on available parameters
        const queryObject = {};
        if (featured) { queryObject.featured = featured === 'true'; }
        // Use a case-insensitive regex for the company and name fields if provided - allowing for more flexible matching.
        if (company) { queryObject.company = { $regex: company, $options: 'i' }; }
        if (name) { queryObject.name = { $regex: name, $options: 'i' }; }

        // Begin the query to fetch products based on the query object 
        let result = ProductModelSchema.find(queryObject);

        // If a sort key is specified, apply sorting
        if (sort) { result.sort(sort.split(',').join(' ')); } 
        // Default sort by 'createdAt' if no sort key is provided
        else { result.sort('createdAt'); }

        // If specific fields are specified, select only those fields
        if (fields) { result.select(fields.split(',').join(' ')); }

        // Await the result after all modifications to the query
        const products = await result;

        // Send successful response with products data
        res.status(200).json({ msg: 'Success', data: products, nbHits: products.length });
    } catch (error) {
        // Log errors specific to the dynamic products retrieval
        console.error('Error in getAllProducts', error);
    }
};

// Export the functions
module.exports = { getAllProductsStatic, getAllProducts };
