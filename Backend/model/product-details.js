const mongoose = require('mongoose');

const product_detail = mongoose.Schema({


    _id: { type: String },
    firstName: { type: String },
    quantity: { type: Number },
    price: { type: Number },

});

module.exports = mongoose.model('productdetail', product_detail);