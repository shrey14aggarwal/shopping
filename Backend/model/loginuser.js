const mongoose = require('mongoose');

const loginuserModel = mongoose.Schema({

 
    email : { type : String},
    password : { type : String},
   
});

module.exports = mongoose.model('LoginUsers', loginuserModel);