const { readFileSync } = require('fs');
const http = require('http');
const url = require('url');

const data = readFileSync('./data.json', 'utf-8');
const dataJson = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    switch (pathName){
        case '/': 
            res.writeHead(400, {
                'Content-type':'text/html'
            });
            res.end(`
                <h1>This is the root project</h1>
                <p>to see the products click <a href="/product">here</a></p>
                <p>to see the api click <a href="/api">here</a></p>
                `);
            break;
        
        case '/product':
            res.writeHead(400, {
                'Content-type':'text/html'
            });
            res.end(`
                <h1>This is the product page</h1>
                <p>to return home click <a href="/">here</a></p>
                `);
            break;
        case '/api':
            res.writeHead(400, {
                'Content-type':'application/json'
            });
            res.end(data);
            break;
    }
});

server.listen(8000, () => {
    console.log('Listening on port 8000');
});
