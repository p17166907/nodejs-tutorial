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

app.listen(3000, () => { console.log('Listening on port 3000') })
