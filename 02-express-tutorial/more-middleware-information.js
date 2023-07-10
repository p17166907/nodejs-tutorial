const express = require('express');
const app = express();

const logger = require('./logger-middlware');
const authorize = require('./authorize-middlware');

// Using multiple middlaware functions
app.use([logger, authorize]);

app.get('/', (req, res) => { return res.status(200).send(`<h1> Home Page</h1>`) })

app.get('/about', (req, res) => { return res.status(200).send(`<h1> About Page</h1>`) })

app.get('/api/items', (req, res) => { console.log(req.user); return res.status(200).send(`<h1> /api/items Page </h1>`) })


app.all('*', (req, res) => { return res.status(404).send(`<h1> Page Not Found</h1>`) })

app.listen(3000, () => { console.log(`listening on port 3000`); });