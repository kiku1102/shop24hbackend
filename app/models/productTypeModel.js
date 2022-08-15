const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productTypeSchema = new Schema({
    _id:{
        type:mongoose.Types.ObjectId
    },
    name:{
        type: String,
        required:true,
        unique:true
    },
    description:{
        type: String
    },
    timeCreated:{
        type:Date,
        default:Date.now()
    },
    timeUpdated:{
        type:Date,
        default:Date.now()
    }
})
module.exports = mongoose.model("productType", productTypeSchema);