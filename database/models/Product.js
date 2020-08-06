"use strict"
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ProductSchema = new mongoose.Schema({
    name:       { type: String, require: true },
    price:      { type: Number, require: true, Min: 0 },
    expiration: { type: Date, require: false }
});

ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', ProductSchema);