const fs = require('fs');

module.exports = (res, dataJson) => {
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
                'Content-type': 'text/html'
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
};