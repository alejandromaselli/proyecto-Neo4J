const mongoose = require('mongoose');

const trimMapSchema = new mongoose.Schema({
    name: String,
    location: {
        lat: Number,
        lng: Number
    }
},{ retainKeyOrder: true })

