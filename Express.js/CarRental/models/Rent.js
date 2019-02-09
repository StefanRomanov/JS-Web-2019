const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
    days: { type: mongoose.SchemaTypes.Number, required: true },
    car: { type: mongoose.SchemaTypes.ObjectId, ref: 'Car' },
    owner: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
});

const Rent = mongoose.model('Rent', rentSchema);

module.exports = Rent;