const express = require('express');
const app = express();

// req => middleware => res
//middleware as checkpoints that your requests pass through, 
//where you can perform tasks, modify data, 
//or control the flow of the request before it reaches the final route handler.
const logger = (req, res, next) => {
    const { method, url } = req;
    const time = new Date().getFullYear();
    console.log(`method: ${method}, url: ${url}`);
    console.log(time);
    //res.send(`middleware checkpoint ${time}`)
    next(); // Call next to pass control to the next middleware or route handler
};

app.use(logger);

app.get('/', (req, res) => {



    return res.status(200).send(`<h1> Home Page</h1>`)
})

app.get('/about', (req, res) => { return res.status(200).send(`<h1> About Page</h1>`) })



app.all('*', (req, res) => { return res.status(404).send(`<h1> Page Not Found</h1>`) })

app.listen(3000, () => { console.log(`listening on port 3000`); });