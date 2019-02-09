const db = require('../config/dataBase');
const fs = require("fs");
const mth = require('../util/mime-type-handler');
const handlerUtils = require('../util/handler-utils');

const statusFileLocation = "../views/status.html";

module.exports = (req, res) => {

    if (req.headers.statusheader === 'Full') {

        let filePath = handlerUtils.getFilePath(statusFileLocation);
        let count = db.length;
        let content = `We currently have ${count} movies in our database !`;

        fs.readFile(filePath, (err, data) => {

            if (err) {
                handlerUtils.errorResponse(res);
            } else {

                res.writeHead(200, {
                    'Content-Type': mth(filePath)
                });

                let html = data.toString().replace('{{replaceMe}}', content);
                res.write(html);
                res.end();
            }
        });

    } else {
        return true;
    }
};