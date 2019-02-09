const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
    users: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
    dateCreated: {type: mongoose.SchemaTypes.Date, required: true, default: Date.now()} 
});

const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;