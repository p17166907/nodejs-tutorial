const  ProductModelSchema = require('../models/product')

const getAllProductsStatic = async (req, res, next) => {
    const products = await ProductModelSchema.find({})
    // throw new Error('testing async errors');
    res.status(200).json({msg: 'Successs', data: products, nbHits: products.length});
}
const getAllProducts = async (req, res, next) => { res.status(200).send('Getting All Products'); }

module.exports = { getAllProductsStatic, getAllProducts }