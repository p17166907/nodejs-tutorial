const http = require('http')

// const server = http.createServer((req, res) => {
//   console.log('request event')
//   res.end('Hello World')
// })

const server = http.createServer((req, res) => {
  console.log('request event');
  console.log(req.url);
  
  // Set the response status code and headers
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Write the response body
  res.write('Hello, World!');

  // End the response
  res.end();
});

server.listen(3000, () => { console.log('Server listening on port 3000'); });