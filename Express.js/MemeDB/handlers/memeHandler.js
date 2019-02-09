const db = require('../config/dataBase');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const shortid = require('shortid');

const viewAllHtmlPath = '../views/viewAll.html';
const addMemeHtmlPath = '../views/addMeme.html';
const detailsHtmlPath = '../views/details.html';
const replacementString = '<div id="replaceMe">{{replaceMe}}</div>';


function generateMeme(id,title,memeSrc,description,privacy) {
    return {
        id: id,
        title: title,
        memeSrc: memeSrc,
        description: description,
        privacy: privacy,
        timestamp: Date.now()
    };
}


function viewAll(req, res) {
    let memes = db.getDb().filter(m => m.privacy === 'on');

    let filePath = path.normalize(
        path.join(__dirname, viewAllHtmlPath));

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, {
                'Content-Type': "text/plain"
            });
            res.write('Something went wrong');
            res.end();
            return;
        }
        let memesHtml = '';

        for (let meme of memes) {
            memesHtml += `<div class="meme">
                            <a href="/getDetails?Id=${meme.id}">
                            <img class="memePoster" src="${meme.memeSrc}"/>
                          </div>`;
        }

        let html = data.toString().replace(replacementString, memesHtml);
        res.write(html);
        res.end();
    });
}

function viewAddMeme(req, res) {
    let filePath = path.normalize(
        path.join(__dirname, addMemeHtmlPath));


    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, {
                'Content-Type': "text/plain"
            });
            res.write('Something went wrong');
            res.end();
            return;
        }


        res.write(data);
        res.end();
    });
}

function getDetails(req, res) {
    let memes = db.getDb();
    let filePath = path.normalize(
        path.join(__dirname, detailsHtmlPath));
    let inputData = qs.parse(req.url.split('?')[1]);
    
    let targetedMeme = memes.filter(m => m.id === inputData['Id'])[0];

    let str = `<div class="content">
                    <img src="${targetedMeme.memeSrc}" alt=""/>
                    <h3>Title ${targetedMeme.title}</h3>
                    <p> ${targetedMeme.description}</p>
                </div>`;

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, {
                'Content-Type' : "text/plain"
            });
            res.write('Something went wrong');
            res.end();
            return;
        }

        let html = data.toString().replace(replacementString,str);
        res.write(html);
        res.end();
    });
}

function addMeme(req, res) {
    let form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.writeHead(500, {
                'Content-Type': "text/plain"
            });
            res.write('Something went wrong');
            res.end();
            return;
        }

        let id = shortid.generate();

        let oldpath = files['meme'].path;
        let newpath = './public/memeStorage/' + id + '.jpg';

        db.add(generateMeme(id, fields['memeTitle'], newpath, fields['memeDescription'], fields['status']));
        
        fs.copyFile(oldpath, newpath, (err) => {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': "text/plain"
                });
                res.write('Something went wrong');
                res.end();
                return;
            }

            res.writeHead(301,
                {
                    Location: '/viewAllMemes'
                });
            res.end();
        });
    });
}




module.exports = (req, res) => {
    if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
        viewAll(req, res);
    } else if (req.pathname === '/addMeme' && req.method === 'GET') {
        viewAddMeme(req, res);
    } else if (req.pathname === '/addMeme' && req.method === 'POST') {
        addMeme(req, res);
    } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
        getDetails(req, res);
    } else if (req.pathname.startsWith('public/memeStorage') && req.method === 'GET') {
        console.log('HERE');
    }
    else {
        return true;
    }
};
