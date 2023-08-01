const express = require('express')
const app = express()

// require .env file
require('dotenv').config()

//middleware
app.use(express.json())

//Routes
app.get('/', (req, res) => {
    res.status(200).send(`<h1>Store APi</h1><br><a href="/api/v1/products">products route</a>`)
})

//Products routes
// ... [Add your product routes here]

// Error handling middleware should be added AFTER all other routes and middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        app.listen(port, () => { console.log(`Server is listening on port ${port}....`); });
    } catch (error) { 
        console.log(error); 
    }
}

start()
