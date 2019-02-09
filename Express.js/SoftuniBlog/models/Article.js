const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    content: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: mongoose.SchemaTypes.Date
    }
});

const user = mongoose.model('Article', articleSchema);

module.exports = user;