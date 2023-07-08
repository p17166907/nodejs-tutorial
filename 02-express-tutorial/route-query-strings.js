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



// query string
app.get('/api/v1/query', (req, res) => {
    //example query on browser: http://localhost:3000/api/v1/query?search=albany
    //xample query on browser: http://localhost:3000/api/v1/query?limit=2
    console.log('req.query: ', req.query);     // prints: req.query:  { search: 'albany' } OR req.query:  { limit: '2' }

    const { search, limit } = req.query;
    let sortedProducts = [...products];
    
    if (search) { sortedProducts = sortedProducts.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())); }
    //we must have only one response per request unless response is conditional and perhaps requires multiple then we use the 'return'
    if (sortedProducts.length < 1) { return res.status(200).send(`<h1> No Products Found </h1>`); }//conditional response - so must use the 'return'
    
    if (limit) {  sortedProducts = sortedProducts.slice(0, Number(limit)); }

    return res.status(200).json(sortedProducts); // main response
    
    
});




app.all('*', (req, res) => { res.status(404).send(`<h1> ${res.statusCode} Page Not Found </h1>`) })


app.listen(3000, () => { console.log('Listening on port 3000') })
