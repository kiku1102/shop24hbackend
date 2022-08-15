//khai báo thư viện express
const express = require('express');
const app = new express();
const mongoose = require('mongoose');
const port = 8000;
const cors = require("cors");

// Khai báo middleware đọc json
app.use(express.json());
app.use(cors());
// Khai báo middleware đọc dữ liệu UTF-8
app.use(express.urlencoded({
    extended: true
}))
//import model
const productTypeModel = require("./app/models/productTypeModel");
const productModel = require("./app/models/productModel");
const customerModel = require("./app/models/customerModel");
const orderModel = require("./app/models/orderModel");
//import router
const productTypeRouter = require('./app/routers/productTypeRouter');
const productRouter = require('./app/routers/productRouter');
const customerRouter = require('./app/routers/customerRouter');
const orderRouter = require('./app/routers/orderRouter');

//sử dụng rourter
app.use('/', productTypeRouter);
app.use('/', productRouter);
app.use('/', customerRouter);
app.use('/', orderRouter);
//kết nối csdl mongodb
mongoose.connect("mongodb+srv://kiku:kiku1102@cluster0.mawmfxq.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    if (error) {
        throw error;
    }
    console.log("successfully connected!")
})


app.listen(port, () => {
    console.log(`App chạy trên cổng ${port} `)
})