let db = require('../config/dataBase');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const mth = require('../util/mime-type-handler');
const handlerUtils = require('../util/handler-utils');


const viewAllFileLocation = '../views/viewAll.html';
const detailsFileLocation = '../views/details.html';
const addMovieFileLocation = '../views/addMovie.html';
const addErrorHtml = `<div id="errBox">
                          <h2 id="errMsg">Please fill all fields</h2>
                      </div>`;
const addSuccessHtml = `<div id="successBox">
                            <h2 id="successMsg">Movie added</h2>
                        </div>`;


module.exports = (req, res) => {
    let resourcePath = req.pathname || url.parse(req.url).pathname;

    if (resourcePath === "/viewAllMovies" && req.method === "GET") {
        let filePath = handlerUtils.getFilePath(viewAllFileLocation);

        fs.readFile(filePath, (err, data) => {
            if (err) {
                handlerUtils.errorResponse(res);

            } else {

                res.writeHead(200, {
                    'Content-Type': mth(filePath)
                });

                let content = '';

                for (let entry of db) {
                    content += `<div class="movie">
                                <a href="/details/${entry.id}" data-id="${entry.id}"><img class="moviePoster" src="${decodeURIComponent(entry.moviePoster)}"/></a>          
                               </div>`;
                }

                let html = data.toString().replace('{{replaceMe}}', content);

                res.write(html);
                res.end();
            }
        });
    } else if (resourcePath.startsWith('/details/') && req.method === 'GET') {

        let id = resourcePath.split('/')[2] - 1;

        let filePath = handlerUtils.getFilePath(detailsFileLocation);

        fs.readFile(filePath, (err, data) => {
            if (err) {
                handlerUtils.errorResponse(res);

            } else {
                res.writeHead(200, {
                    'Content-Type': mth(filePath)
                });

                let movie = db[id];

                let detailsHtml = `<div class="content">
                                        <img src=${movie.moviePoster} alt=""/>
                                        <h3>Title ${movie.movieTitle}</h3>
                                        <h3>Year ${movie.movieYear}</h3>
                                        <p>${movie.movieDescription}</p>
                                    </div>`;

                let html = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', detailsHtml);
                res.write(html);
                res.end();
            }
        });
    } else if (resourcePath === '/addMovie' && req.method === 'GET') {
        let filePath = handlerUtils.getFilePath(addMovieFileLocation);

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

    } else if (resourcePath === '/addMovie' && req.method === 'POST') {
        let filePath = handlerUtils.getFilePath(addMovieFileLocation);

        let inputData = {};

        req.on("data", (data) => {
            inputData = qs.parse(data.toString());
        });

        req.on("end", () => {

            if (inputData['movieTitle'] === null || inputData['movieTitle'] === '' || inputData['moviePoster'] === null || inputData['moviePoster'] === '') {

                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        handlerUtils.errorResponse(res);
                    } else {
                        res.writeHead(200, {
                            'Content-Type': mth(filePath)
                        });

                        let html = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', addErrorHtml);

                        res.write(html);
                        res.end();
                    }
                });
            } else {
                let index = db.length + 1;
                db.push({
                    'id': index,
                    'movieTitle': inputData['movieTitle'],
                    'movieYear': inputData['movieYear'],
                    'moviePoster': inputData['moviePoster'],
                    'movieDescription': inputData['movieDescription']
                });

                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        handlerUtils.errorResponse(res);
                    } else {
                        res.writeHead(200, {
                            'Content-Type': mth(filePath)
                        });

                        let html = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', addSuccessHtml);

                        res.write(html);
                        res.end();
                    }
                });
            }
        });

    } else {
        return true;
    }
};