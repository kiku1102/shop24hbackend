const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    orderDate: {
        type: Date,
        default: Date.now()
    },
    shipperDate: {
        type: Date
    },
    note: {
        type: String
    },
    orderDetail: {
        type: Array
    },
    cost: {
        type: Number,
        default: 0
    },
    timeCreated: {
        type: Date,
        default: Date.now()
    },
    timeUpdated: {
        type: Date,
        default: Date.now()
    },
    customerInfo:{
        type:Object
    }

})
module.exports = mongoose.model("order", orderSchema);