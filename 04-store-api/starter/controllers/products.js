// Import the product model schema
const ProductModelSchema = require('../models/product');

// Function to retrieve all products from the database statically
const getAllProductsStatic = async (req, res) => {
    try {
        // Fetch all products
        const products = await ProductModelSchema.find({});
        // Send a successful response with the products data
        res.status(200).json({ msg: 'Success', data: products, nbHits: products.length });
    } catch (error) {
        // Log any errors that occur during the static retrieval of products
        console.error('Error in getAllProductsStatic', error);
    }
};

// Function to retrieve products based on provided query parameters
const getAllProducts = async (req, res) => {
    try {
        // Destructure and extract required query parameters
        const { featured, company, name, sort, fields, page = 1, limit = 10, numericFilters } = req.query;

        //{{tskMngrURL}}/products?featured=false&company=ikea&name=wood&sort=price&fields=name,price&numericFilters=price>15

        // Prepare the query object based on the extracted parameters
        const queryObject = {};
        //{{tskMngrURL}}/products?featured=false
        if (featured) { queryObject.featured = featured === 'true'; } // Convert 'featured' string to boolean
        //{{tskMngrURL}}/products?company=ikea
        if (company) { queryObject.company = { $regex: company, $options: 'i' }; } // Case-insensitive matching
        //{{tskMngrURL}}/products?name=wood
        if (name) { queryObject.name = { $regex: name, $options: 'i' }; } // Case-insensitive matching
        //Mapping (operatorMap) to translate operators like '>' to MongoDB's '$gt', and so forth.
        //{{tskMngrURL}}/products?numericFilters=price>15
        if (numericFilters) {
            const operatorMap = {
                '>': '$gt',
                '>=': '$gte',
                '=': '$eq',
                '<': '$lt',
                '<=': '$lte',
            }
            const regEx = /\b(<|>|>=|=|<|<=)\b/g

            let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
            const options = ['price', 'rating']
            filters = filters.split(',').forEach(item => {
                const [field, operator, value] = item.split('-')
                if (options.includes(field)) { queryObject[field] = { [operator]: Number(value) } }

            });
        }

        // Start constructing the query
        let query = ProductModelSchema.find(queryObject);

        // If 'sort' parameter is specified, apply sorting
        //{{tskMngrURL}}/products?sort=price
        if (sort) { query = query.sort(sort.split(',').join(' ')); }
        // If 'fields' parameter is specified, select only those fields to display in the results list
        //{{tskMngrURL}}/products?fields=name
        if (fields) { query = query.select(fields.split(',').join(' ')); }

        // Apply pagination parameters
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(+limit);

        // Execute the query
        const products = await query;

        console.log(queryObject);

        // Send a successful response with the products data
        res.status(200).json({ msg: 'Success', data: products, nbHits: products.length });
    } catch (error) {
        // Log any errors that occur during the dynamic retrieval of products
        console.error('Error in getAllProducts', error);
    }
};

// Export the functions
module.exports = { getAllProductsStatic, getAllProducts };
