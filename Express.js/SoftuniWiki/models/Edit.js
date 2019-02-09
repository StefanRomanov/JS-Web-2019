const mongoose = require('mongoose');

const editSchema = new mongoose.Schema({
    content: { type: mongoose.SchemaTypes.String, required: true },
    creationDate: { type: mongoose.SchemaTypes.Date, required: true, default: Date.now },
    author: { type: mongoose.SchemaTypes.ObjectId, ref:'User' },
    article: { type: mongoose.SchemaTypes.ObjectId, ref:'Article' }
});

const Edit = mongoose.model('Edit', editSchema);

module.exports = Edit;