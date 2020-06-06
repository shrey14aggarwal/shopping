const mongoose = require('mongoose');
const Products = require('./product');

const userModel = mongoose.Schema({

    firstName : { type : String },
    lastName : { type : String},
    email : { type : String},
    password : { type : String},
    products : {type : [Products.schema]}
});

module.exports = mongoose.model('Users', userModel);

