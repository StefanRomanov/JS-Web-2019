const Image = require('mongoose').model('Image');
const Tag = require('mongoose').model('Tag');
const responseHandler = require('../web/responseHandler');

module.exports = { findByTagsAndDate, findAll, deleteImage};

function findByTagsAndDate(fields,res) {

    let tagNames = fields.tagName.split(',').filter(e => e !== '');
    let tagIds = [];
    let query = {};

    return Tag.find({ 'name': { '$in': tagNames } })
        .exec()
        .then(data => {
            tagIds = data.map(e => e = e._id);

            query = {
                tagIds,
                dateBefore: Date.parse(fields.beforeDate),
                dateAfter: Date.parse(fields.afterDate),
                limit: fields.limit
            };

        })
        .then(() => {
            return Image.find({
                'tags': {
                    '$in': query.tagIds
                },
                'creationDate': getDateQuery(fields, query)
            })
                .limit(parseInt(query.limit));
        })
        .catch(err => {
            responseHandler.Error(res, err);
            return;
        });
}

function findAll(fields,res) {

    return Image.find({})
        .limit(fields.limit)
        .exec()
        .then(result => {
            return result;
        })
        .catch(err => {
            responseHandler.Error(res, err);
            return;
        });
}

function deleteImage(id) {
    return Image.findByIdAndDelete(id)
        .then(image => {
            return Tag.updateMany(
                { '_id': { '$in': image.tags } },
                { '$pull': { 'images': image._id } }
            );
        }).catch(err => {
            throw err;
        });
    }

function getDateQuery(fields, query) {
    if (!fields.beforeDate && !fields.afterDate) {
        return {'$lte' : Date.now() };
    } else if (fields.beforeDate && !fields.afterDate) {
        return { '$lte': query.dateBefore };
    } else if (!fields.beforeDate && fields.afterDate) {
        return { '$gte': query.dateAfter };
    } else {
        return { '$lte': query.dateBefore, '$gte': query.dateAfter };
    }
}