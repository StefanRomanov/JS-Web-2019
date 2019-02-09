module.exports = {
    OK : (res, html) => {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        res.write(html);
        res.end();
    },

    Error: (res, err) => {
        console.log(err);
        res.writeHead(500, {
            'Content-type': 'text/plain'
        });

        res.write('500 Server Error');
        res.end();
    },

    Redirect: (res, path) => {
        res.writeHead(302, {
            Location: path
        });
        res.end();
    }
}