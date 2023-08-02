const getAllProductsStatic = async (req, res, next) => { res.status(200).send('Getting All Products Static'); }
const getAllProducts = async (req, res, next) => { res.status(200).send('Getting All Products'); }

module.exports = { getAllProductsStatic, getAllProducts }