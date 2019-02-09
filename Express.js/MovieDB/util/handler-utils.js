const mth = require('./mime-type-handler');
const path = require("path");

module.exports = {
    getFilePath: (fileLocation) => {
        return path.normalize(
            path.join(__dirname, fileLocation)
        );
    },

    errorResponse: (res) => {
        res.writeHead(404, {
            'Content-Type': mth('plain')
        });
        res.write("404 Not Found.");

        res.end();
    }
};