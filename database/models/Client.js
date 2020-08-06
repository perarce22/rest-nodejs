"use strict"
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ClientSchema = new mongoose.Schema({
    codigo:       { type: String, require: true },
    latitud:      { type: String, require: true},
    longitud: { type: String, require: true }
});

ClientSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Client', ClientSchema);