const express = require('express');
const path = require('path');

const app = express();

// Setting up the middleware
//This middleware function serves static files from the specified directory. In this case, it serves static files from the public directory.
app.use(express.static('./public'))
// app.get('/', (req, res) => { res.sendFile(path.resolve(__dirname, './navbar-app/index.html')); });

///This method captures all HTTP methods (GET, POST, etc.) for any route that hasn't been matched by previous route handlers.
app.all('*', (req, res) => { res.status(404).send(`<h1> ${res.statusCode} Page Not Found </h1>`) })


app.listen(3000, () => { console.log(`listening on port 3000`); });