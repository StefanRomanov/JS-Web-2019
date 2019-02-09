const url = require("url");
const fs = require("fs");
const mth = require('../util/mime-type-handler');
const handlerUtils = require('../util/handler-utils');

const homeFileLocation = "../views/home.html";

module.exports = (req, res) => {
    let resourcePath = req.pathname || url.parse(req.url).pathname;

    if (resourcePath === '/' && req.method === 'GET') {
        let filePath = handlerUtils.getFilePath(homeFileLocation);

        fs.readFile(filePath, (err, data) => {

            if (err) {
                handlerUtils.errorResponse(res);
            } else {

                res.writeHead(200, {
                    'Content-Type': mth(filePath)
                });
                res.write(data);
                res.end();
            }
        });
       
    } else {
        return true;
    }
};