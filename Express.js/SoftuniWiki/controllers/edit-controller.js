const Edit = require('../models/Edit');

module.exports = {
    detailsGet: (req, res) => {
        let id = req.params.id;

        Edit.findById(id)
            .populate('article')
            .then(edit => {
                res.render('edit/details', edit)
            })
            .catch(err => {
                console.log(err);
                res.locals.globalError = 'Oops.Something went wrong !';
                res.render('home/index');
            })
    }
}