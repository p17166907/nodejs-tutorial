const express = require('express');
const app = express();

const { products } = require('./data');

app.get('/', (req, res) => {
    res.write('<h1> Home Page </h1>');
    res.write('<a href="/api/products"> Products </a>');
    res.end();
});

//create a rout for /api/products
app.get('/api/products', (req, res) => {
    //mapping to get a new array of products - then getting only specific properties from the objects in the array
    const newProducts = products.map(product => { const { id, name, image, price, desc } = product; return { id, name, image }; })
    res.status(200).json(newProducts);


});

//create a route parameter 
app.get('/api/products/:productID', (req, res) => {
    console.log(req.params);
    //destructure from params object
    const { productID } = req.params;
    //find product where the product id from list of products matches the productID from params (note id is number and value from params is string!!)
    const singleProduct = products.find((product) => product.id === Number(productID));

    if (!singleProduct) { res.status(404).send(`<h1> ${res.statusCode} Product not found </h1>`) }
    else { res.status(200).json(singleProduct); }
});

app.listen(3000, () => { console.log('Listening on port 3000') })
