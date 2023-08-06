// Import the product model schema
const ProductModelSchema = require('../models/product');

const getAllProductsStatic = async (req, res, next) => {
    try {
        // Fetch all products
        const products = await ProductModelSchema.find({});
        res.status(200).json({ msg: 'Success', data: products, nbHits: products.length });
    } catch (error) {
        // Log errors specific to the static products retrieval
        console.log('Error in getAllProductsStatic', error);
    }
};

const getAllProducts = async (req, res, next) => {
    try {
        const { featured, rating, createdAt, name, price, company } = req.query
        const queryObject = {}
        if (featured) { queryObject.featured = (featured === 'true') ? true : false }
        // Use a case-insensitive regex for the name field if provided - allowing for more flexible matching.
        if (company) { queryObject.company = { $regex: company, $options: 'i' }; }
        // Use a case-insensitive regex for the name field if provided - allowing for more flexible matching.
        if (name) { queryObject.name = { $regex: name, $options: 'i' }; }

        console.log(queryObject);
        // Fetch products based on the query object
        const products = await ProductModelSchema.find(queryObject);
        res.status(200).json({ msg: 'Success', data: products, nbHits: products.length });
    } catch (error) {
        // Log errors specific to the dynamic products retrieval
        console.log('Error in getAllProducts', error);
    }
};

// Export the functions
module.exports = { getAllProductsStatic, getAllProducts };
