const express = require('express');
const app = express();

app.get('/', (req, res) => { res.status(404).send('Home Page'); });

app.get('/about', (req, res) => { res.status(404).send('About Page'); });

///This method captures all HTTP methods (GET, POST, etc.) for any route that hasn't been matched by previous route handlers.
app.all('*', (req, res) => { res.status(404).send(`<h1>${res.statusCode} Page Not Found </h1>`); });

app.listen(3000, () => { console.log('App listening on port 3000'); });
