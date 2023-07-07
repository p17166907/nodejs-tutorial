console.log('Express Tutorial');

const http = require('http');
const { readFileSync } = require('fs');

const htmlHomepage = readFileSync('./navbar-app/index.html', 'utf8');
const cssHomeStyles = readFileSync('./navbar-app/styles.css');
const homeImage = readFileSync('./navbar-app/logo.svg');
const homeLogic = readFileSync('./navbar-app/browser-app.js');


const server = http.createServer((req, res) => {
    console.log(`User hits the server from a URL in the browser with method ${req.method}, `);

    const url = req.url;
    
    if (url === '/') {
        //Homepage 
        res.writeHead(200, { 'Content-Type': 'text/html' }); //server writing to the browswer in html format

        res.write(htmlHomepage);  //file content passed to browser from server
        console.log(`Server response status code ${res.statusCode}`);
        res.end();

    } else if (url === '/about') {
        //About page
        res.writeHead(200, { 'Content-Type': 'text/html' });

        const htmlContent = `<h1>About Page</h1>`;

        res.write(htmlContent);
        console.log(`Server response status code ${res.statusCode}`);
        res.end();
    } else if (url === '/styles.css') {
        //Styles
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(cssHomeStyles);
        console.log(`Server response status code ${res.statusCode}`);
        res.end();
    } else if (url === '/logo.svg') {
        //image/logo
        res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
        res.write(homeImage);
        console.log(`Server response status code ${res.statusCode}`);
        res.end();
    } else if (url === '/browser-app.js') {
        //logic
        res.writeHead(200, { 'Content-Type': 'image/javascript' });
        res.write(homeLogic);
        console.log(`Server response status code ${res.statusCode}`);
        res.end();
    } else {
        // Not found page 404
        res.writeHead(400, { 'Content-Type': 'text/html' });
        const htmlContent = `<h1>Page Not Found ${res.statusCode}</h1>`;
        res.write(htmlContent);
        res.end();
    }


}).listen(3000, () => { console.log('Listening on port 3000'); });
