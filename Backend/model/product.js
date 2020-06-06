const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    item : { type : String },
    price : { type : Number },
    quantity : { type : Number}
});

module.exports = mongoose.model('Products', productSchema);

