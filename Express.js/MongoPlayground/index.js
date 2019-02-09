const http = require('http');
const url = require('url');
const qs = require('querystring');
const port = process.env.PORT || 5000;
const handlers = require('./handlers/handlerBlender');

const db = require('./config/db');


db.then(() => {
    console.log('Database is running');

    http
        .createServer((req, res) => {
            req.pathname = url.parse(req.url).pathname
            req.pathquery = qs.parse(url.parse(req.url).query)
            for (let handler of handlers) {
                if (!handler(req, res)) {
                    break
                }
            }
        })
        .listen(port);

    console.log(`Server is running on port ${port}`);
}

).catch((err) => {
    throw err;
});

