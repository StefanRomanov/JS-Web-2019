const http = require('http');

const port = 3000;
const handlers = require("./handlers/request-handler");



http.createServer((req, res) => {
    for (let handler of handlers) {
        if (!handler(req, res)) {
            break;
        }
    }
}).listen(port);