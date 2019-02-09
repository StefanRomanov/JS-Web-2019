const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: {
        type: mongoose.SchemaTypes.String,
        required: true
    },

    creationDate: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now(),
        required: true
    },

    title: {
        type: mongoose.SchemaTypes.String,
        required: true
    },

    description: mongoose.SchemaTypes.String,

    tags: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Tag" }]
});

module.exports = mongoose.model('Image', imageSchema);