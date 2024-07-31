const mongoose = require("mongoose")
const devSchema = mongoose.Schema({
    message: {
        type:String,
        required:true
    }
    
})

const Developer = mongoose.model('Developer', devSchema);

module.exports = Developer
