const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    console.log(req.url);
    res.end(`<h1>hello there, you just reload, didn't you?!</h1>`);
});

server.listen(8000, () => {
    console.log('Listening on port 8000');
});