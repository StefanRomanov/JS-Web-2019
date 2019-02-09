const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    model: { type: mongoose.SchemaTypes.String, required: true },
    image: { type: mongoose.SchemaTypes.String, requred:true },
    pricePerDay: { type: mongoose.SchemaTypes.Number, required: true },
    isRented: { type: mongoose.SchemaTypes.Boolean, required: true, default: false}
})

const Car = mongoose.model('Car', carSchema);

module.exports = Car;