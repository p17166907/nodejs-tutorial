const EventEmitter = require('events');

// Create an instance of EventEmitter
const partyEmitter = new EventEmitter();

// Define a listener function for the "music" event
const musicListener = () => { console.log('Let\'s dance to the music!'); };

// Subscribe the listener to the "music" event
partyEmitter.on('music', musicListener);

// Emit the "music" event
partyEmitter.emit('music');

///////////////////////////////////////////////////////////////////////////////

// const customEmitter = new EventEmitter();

// customEmitter.on('response', () => { console.log(`data received`) })
// customEmitter.on('response', () => { console.log(`some other logic`) })

// customEmitter.emit('response');

///////////////////////////////////////////////////////////////////////////////

const customEmitter = new EventEmitter();

customEmitter.on('response', (name,id) => { console.log(`data received for user: ${name} with id: ${id}`) })
customEmitter.on('response', () => { console.log(`some other logic`) })

customEmitter.emit('response');



///////////////////////////////////////////////////////////////////////////////


// const http = require('http');

// const server = http.createServer()

// server.on('request', (req, res) => {
//     if (req.url === '/') { res.end('Welcome to the homepage'); }
//     else if (req.url === '/about') { res.end('This is the about page'); }
//     else { res.end(`<h1>OOPS!!!!</h1><br />${req.url} does not exist`); }
// });


// server.listen(3000, () => { console.log('Server is running on http://localhost:3000'); });