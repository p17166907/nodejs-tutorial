const express = require('express');

app = express();

const {products} = require('./data');



app.get('/', (req, res) => {
    const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }, { id: 3, name: 'Bob' }];
    //used to send a JSON response to the client. It serializes a JavaScript object or an array into a JSON string and sets the appropriate Content-Type header to indicate that the response contains JSON data.
    res.json(users)
})


app.listen(3000, () => { console.log(`Listening on port 3000`); })