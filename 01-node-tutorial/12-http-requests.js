const http = require('http');

const server = http.createServer((req, res) => {
//This callback function takes two parameters: req (short for request) and res (short for response). 
//The callback gets executed whenever an HTTP request is made to the server.
//Making a GET request to: '/' the homepage will return the homepage.
  if (req.url === '/') { res.end('Welcome to the homepage'); }
  else if (req.url === '/about') { res.end('This is the about page'); }
  else { res.end(`<h1>OOPS!!!!</h1><br />${req.url} does not exist`); }
});

server.listen(3000, () => { console.log('Server is running on http://localhost:3000'); });



//////////
// const http = require('http')

// // const server = http.createServer((req, res) => {
// //   console.log('request event')
// //   res.end('Hello World')
// // })

// const server = http.createServer((req, res) => {
//   console.log('request event');
//   console.log(req.url);
  
//   // Set the response status code and headers
//   res.writeHead(200, { 'Content-Type': 'text/plain' });

//   // Write the response body
//   res.write('Hello, World!');

//   // End the response
//   res.end();
// });

// server.listen(3000, () => { console.log('Server listening on port 3000'); });