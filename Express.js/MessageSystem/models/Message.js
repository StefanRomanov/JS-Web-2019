const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: {type: mongoose.SchemaTypes.String, required: true},
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    thread: { type: mongoose.SchemaTypes.ObjectId, required: true }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;