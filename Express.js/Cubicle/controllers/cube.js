const Cube = require('../models/Cube');

function handleErrors(err, res, body) {
    let errors = [];

    for (const prop in err.errors) {
        errors.push(err.errors[prop].message);
    }

    res.locals.globalErrors = errors;
    res.render('create', body);
}

module.exports = {
    createGet: (req, res) => {
        res.render('create');
    },

    createPost: (req, res) => {
        const body = req.body;

        body.difficulty = Number(body.difficulty);

        Cube.create(body)
            .then(cube => {
                res.redirect('/');
            })
            .catch(err => {
                handleErrors(err, res, body);
            });
    },
    details: (req, res) => {
        const cubeId = req.params.cubeId;

        Cube.findById(cubeId)
            .then(cube => {
                res.render('details', cube);
            })
            .catch(err => {
                console.log(err);
            });
    }
};