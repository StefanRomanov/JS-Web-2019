const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: { type: mongoose.SchemaTypes.String, required: true },
    content: {type: mongoose.SchemaTypes.String, required: true},
    isLocked: { type: mongoose.SchemaTypes.Boolean, required: true, default: false },
    creationDate: {type: mongoose.SchemaTypes.Date, required: true, default: Date.now},
    edits: [{ type: mongoose.SchemaTypes.ObjectId, ref:'Edit' }]
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;