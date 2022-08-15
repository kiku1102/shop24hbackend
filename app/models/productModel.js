const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
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
    type:{
        type: mongoose.Types.ObjectId,
        ref:"productType",
    },
    imageUrl:{
        type: String,
        required:true
    },
    buyPrice:{
        type: Number,
        required:true
    },
    amount:{
        type: Number,
       default:0
    },
    timeCreated:{
        type:Date,
        default:Date.now()
    },
    timeUpdated:{
        type:Date,
        default:Date.now()
    },
    product:[{
        type:mongoose.Types.ObjectId,
        ref:'product'
    }],
})
module.exports = mongoose.model("product", productSchema);