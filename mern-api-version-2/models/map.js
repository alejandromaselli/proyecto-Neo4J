const mongoose = require('mongoose');

const mapSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    location: {
        lat: Number,
        lng: Number
    }
}, { retainKeyOrder: true });

module.exports = mongoose.model('MapStream', mapSchema);