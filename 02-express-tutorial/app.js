const express = require('express')
const app = express()
let { people } = require('./data.js')

//static assets
app.use(express.static('./methods-public'))
//parse form data
app.use(express.urlencoded({ extended: false }))

app.get('/api/people', (req, res) => { return res.status(200).json({ success: true, data: people }) })
app.post('/login', (req, res) => {
    console.log(req.body);
    const { name } = req.body
    if (name) { return res.status(200).send(`Welcome ${name}`) } else { return res.status(401).send(`Invalid!! Please provide a name`) }
})


app.all('*', (req, res) => { return res.status(404).send('<h1> Page not found</h1>') })


app.listen(3000, () => { console.log('listening on port 3000'); })