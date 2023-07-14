const express = require('express')
const app = express()
let { people } = require('./data.js')

//parse json
app.use(express.json())


//static assets
app.use(express.static('./methods-public'))
//parse form data from html file in static assests
app.use(express.urlencoded({ extended: false }))

app.get('/api/people', (req, res) => { return res.status(200).json({ success: true, data: people }) })
app.post('/login', (req, res) => {
    console.log(req.body);
    const { name } = req.body
    if (name) { return res.status(200).send(`Welcome ${name}`) } else { return res.status(401).send(`Invalid!! Please provide a name`) }
})

app.post('/api/people', (req, res) => {
    console.log(req.body);
    const { name } = req.body
    if (!name) { return res.status(400).json({ success: false, msg: 'please provide name value' }) }
    return res.status(201).json({ success: true, person: name })
})


app.post('/api/postman/people', (req, res) => {
    const { name } = req.body
    if (!name) { return res.status(400).json({ success: false, msg: 'please provide name value' }) }
    return res.status(201).send({ success: true, data: [...people, name] })

})

app.put('/api/people/:id', (req, res) => {
    //the id parameter is extracted from the request URL
    const { id } = req.params;
    const { name } = req.body;

    if (!name) { return res.status(400).json({ success: false, msg: 'Please provide a name' }); }

    // Find the person by ID extracted from url and update their name
    const person = people.find((person) => person.id === Number(id));     //parseInt - Converts a string to an integer.
    if (!person) { return res.status(404).json({ success: false, msg: `no person with id: ${id}` }); }
    person.name = name;

    return res.status(200).json({ success: true, data: people });
});



app.all('*', (req, res) => { return res.status(404).send('<h1> Page not found</h1>') })


app.listen(3000, () => { console.log('listening on port 3000'); })