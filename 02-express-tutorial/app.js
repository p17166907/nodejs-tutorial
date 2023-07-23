const express = require('express')
const app = express()

// parse json
app.use(express.json())

// static assets
app.use(express.static('./methods-public'))
// parse form data from HTML file in static assets
app.use(express.urlencoded({ extended: false }))

// import and use the people router
const peopleRouter = require('./routes/people')
app.use('/api/people', peopleRouter)

app.post('/login', (req, res) => {
    console.log(req.body);
    const { name } = req.body
    if (name) {
        return res.status(200).send(`Welcome ${name}`)
    } else {
        return res.status(401).send(`Invalid!! Please provide a name`)
    }
})

app.all('*', (req, res) => {
    return res.status(404).send('<h1>Page not found</h1>')
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})
