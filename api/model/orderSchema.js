const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name:String,
    color:String,
    size:String,
    quantity:Number,
    image:String
});

const Order = mongoose.model('orders',orderSchema);

module.exports = Order;