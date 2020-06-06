const mongoose = require('mongoose')

const prod = mongoose.Schema({

    name : { type :String },
    price : { type : Number},
    url : { url : String}
})

module.exports = mongoose.model('prod', prod);