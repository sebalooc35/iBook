const fs = require('fs');
const path = require('path');

module.exports = (dataJson) => {

    const home = fs.readFileSync(path.join(__dirname, '../home.html'), 'utf-8');
    const card = fs.readFileSync(path.join(__dirname, '../card.html'), 'utf-8');

    const cardsHTML = dataJson.books.map((el) => {
        let output = card.replace(/{%AUTHOR%}/g, el.author);
        output = output.replace(/{%TITLE%}/g, el.title);
        output = output.replace(/{%IMAGEURL%}/g, el.imageURL);
        output = output.replace(/{%IMAGEALT%}/g, el.imageALT);
        return output;
    }).join('');

    const finalHTML = home.replace(/{%CARDS%}/g, cardsHTML);

    return finalHTML;
};