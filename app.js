const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

const data = fs.readFileSync('./data.json', 'utf-8');
const dataJson = JSON.parse(data);

const contentTypeMap = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'font/woff',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'font/otf',
    '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
    const pathName = req.url;

    switch (pathName){
        case '/': 
            fs.readFile('./home.html', 'utf-8', (err, home) => {
                if (err) {
                    res.writeHead(404);
                    res.end('HTML file not found');
                    return;
                }
                fs.readFile('./card.html', 'utf-8', (err, card) => {
                    if (err) {
                        res.writeHead(404);
                        res.end('HTML file not found');
                        return;
                    }
                    res.writeHead(200, {
                    'Content-type':'text/html'
                    });
                    const cardsHTML = dataJson.books.map((el) => {
                        let output = card.replace(/{%AUTHOR%}/g, el.author);
                        output = output.replace(/{%TITLE%}/g, el.title);
                        output = output.replace(/{%IMAGEURL%}/g, el.imageURL);
                        output = output.replace(/{%IMAGEALT%}/g, el.imageALT);
                        return output;
                    }).join('');

                    const finalHTML = home.replace(/{%CARDS%}/g, cardsHTML);

                    res.end(finalHTML);
                });
            });
            break;
        
        case '/product':
            res.writeHead(200, {
                'Content-type':'text/html'
            });
            res.end();
            break;

        case '/api':
            res.writeHead(400, {
                'Content-type':'application/json'
            });
            res.end(data);
            break;

        default:
            fs.readFile(`.${pathName}`, (err, file) => {
                if (err) {
                    res.writeHead(404);
                    res.end('File not found');
                }
                res.writeHead(200, {
                'Content-type':contentTypeMap[path.extname(pathName)]
                });
                res.end(file);
            });
            break;
    }
});

server.listen(8000, '0.0.0.0', () => {
    console.log('Listening on port 8000');
});
