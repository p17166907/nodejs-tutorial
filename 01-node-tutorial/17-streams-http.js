// const {createServer} = require('http')
// var {readFileSync} = require('fs')


// const server = createServer((req, res) => {
//     console.log('request event');
//     console.log(req.url);
//     // Set the response status code and headers
//     res.writeHead(200, { 'Content-Type': 'text/plain' });

//     const text = readFileSync('./content/big.txt', 'utf8');

//     // Write the response body
//     res.write(text);


//     // End the response
//     res.end();
// }).listen(3000, () => { console.log('Server listening on port 3000'); });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const { createServer } = require('http');
var { createReadStream } = require('fs');

// Create an HTTP server
const server = createServer((req, res) => {

    // Set the response status code and headers
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Create a readable stream for the file 'big.txt'
    const fileStream = createReadStream('./content/big.txt', 'utf8');

    // Event listener for the 'open' event, which is triggered when the file stream is ready to be read
    fileStream.on('open', () => { fileStream.pipe(res); });// Pipe the file stream to the response stream

    // Event listener for the 'error' event, which is triggered when an error occurs during the file stream
    fileStream.on('error', (err) => { res.write(err); res.end(); }); // Write the error message to the response and end the response

}).listen(3000, () => { console.log('Server listening on port 3000'); });
