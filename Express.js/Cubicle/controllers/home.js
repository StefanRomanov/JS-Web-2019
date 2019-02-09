const Cube = require('../models/Cube');

function handleQueryErrors(from, to) {
    let errors = [];

    if (from && from < 1 || from > 6) {
        errors.push('"From" must be between 1 and 6 !');
    }

    if (to && to < 1 || from > 6) {
        errors.push('"To" must be between 1 and 6 !');
    }

    if (to && from && (from > to)) {
        errors.push('"From" must be smalled than "To" !');
    }

    return errors;
}

module.exports = {
    homeGet: (req, res) => {
        Cube.find({})
            .select('_id name imageUrl difficulty')
            .then(cubes => {
                res.render('index', { cubes });
            })
            .catch(err => {
                console.log(e);
            });
    },
    about: (req, res) => {
        res.render('about');
    },
    search: (req, res) => {
        let { name, from ,to} = req.query;

        from = Number(from);
        to = Number(to);

        let errors = handleQueryErrors(from,to);

        if (errors.length > 0) {
            res.locals.globalErrors = errors;
            res.render('index');
            return;
        } 

        if (name && from && to) {
            Cube.find({})
                .where('difficulty')
                .gte(from)
                .lte(to)
                .then(cubes => {
                    const filtered = cubes
                        .filter(c => c.name.toLowerCase().includes(name.toLowerCase()));

                    res.render('index', { cubes: filtered });
                })
                .catch(err => {
                    console.log(err);
                });
        } else if (name && !from && to) {
            Cube.find({})
                .where('difficulty')
                .lte(to)
                .then(cubes => {
                    const filtered = cubes
                        .filter(c => c.name.toLowerCase().includes(name.toLowerCase()));

                    res.render('index', { cubes: filtered });
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            Cube.find({})
                .where('difficulty')
                .gte(from)
                .then(cubes => {
                    const filtered = cubes
                        .filter(c => c.name.toLowerCase().includes(name.toLowerCase()));

                    res.render('index', { cubes: filtered });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};