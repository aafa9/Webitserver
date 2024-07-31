const mongoose = require("mongoose")
const devSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true,
    },
    descreption:{
        type:String,
        required:true,
    },
    portfolio: {
        type:String,
        required:true, 
    },
    contact: {
        type:String,
        required:true, 
    }
})

const Developer = mongoose.model('Developer', devSchema);

module.exports = Developer
