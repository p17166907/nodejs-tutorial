const { createReadStream } = require('fs');

// Create a readable stream for the file 'big.txt'
const readableStream = createReadStream('./content/big.txt');

// Event listener for the 'data' event, which is triggered when a chunk of data is read
readableStream.on('data', (chunk) => { console.log(`Received ${chunk.length} bytes of data.`); });

// Event listener for the 'end' event, which is triggered when the entire stream has been read
readableStream.on('end', () => { console.log('Finished reading the file.'); });


readableStream.on('error', (err) => { console.log(`An error occured! : ${err} `); });