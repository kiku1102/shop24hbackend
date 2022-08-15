//import customerModel vào file
const { default: mongoose } = require('mongoose');
const customerModel = require('../models/customerModel');
const orderModel = require('../models/orderModel');
const createCustomer = (request, response) => {
    //B1: Chuẩn bị dữ liệu
    let body = request.body;
    //B2: Validate dữ liệu
    if (!body.fullName) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "fullName is invalid"
        })
    }
    if (!body.phone) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "phone is invalid"
        })
    }
    if (!body.email) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "email is invalid"
        })
    }
    if (!body.address) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "address is invalid"
        })
    }

    //B3: Thao tác với cơ sở dữ liệu
    let newInput = {
        _id: mongoose.Types.ObjectId(),
        fullName: body.fullName,
        phone: body.phone,
        email: body.email,
        address: body.address,
        city: body.city,
        country: body.country
    }

    customerModel.create(newInput, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(201).json({
                status: "Create customer Success",
                data: data
            })
        }
    })
}

const getAllCustomers = (request, response) => {
    let phoneNumber = request.query.phoneNumber;
    const condition = {};
    //B1: Chuẩn bị dữ liệu
    if (phoneNumber) {
        condition.phone = phoneNumber;
    }
    //B2: Validate dữ liệu
    //B3: Thao tác với cơ sở dữ liệu
    customerModel
        .find(condition)
        .exec((error, data) => {
            if (error) {
                return response.status(500).json({
                    status: "Error 500: Internal server error",
                    message: error.message
                })
            } else {
                return response.status(200).json({
                    status: "Success: Get Customer success",
                    data: data
                })
            }
        })
}

const getCustomerById = (request, response) => {
    //B1: Chuẩn bị dữ liệu
    let customerId = request.params.customerId;
    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "customerId is not valid"
        })
    }
    //B3: Thao tác với cơ sở dữ liệu
    customerModel.findById(customerId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Get Customer success",
                data: data
            })
        }
    })
}


const updateCustomerById = (request, response) => {
    //B1: Chuẩn bị dữ liệu
    let customerId = request.params.customerid;
    let body = request.body;

    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "customer Id is not valid"
        })
    }
    if (!body.fullName) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "fullName is invalid"
        })
    }
    if (!body.phone) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "phone is invalid"
        })
    }
    if (!body.email) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "email is invalid"
        })
    }
    if (!body.address) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "address is invalid"
        })
    }

    //B3: Thao tác với cơ sở dữ liệu
    let customerUpdate = {
        fullName: body.fullName,
        phone: body.phone,
        email: body.email,
        address: body.address,
        city: body.city,
        country: body.country
    }

    customerModel.findByIdAndUpdate(customerId, customerUpdate, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Update customer success",
                data: data
            })
        }
    })
}

const deleteCustomerById = (request, response) => {
    //B1: Chuẩn bị dữ liệu
    let customerid = request.params.customerid;
    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(customerid)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "customer Id is not valid"
        })
    }
    //B3: Thao tác với cơ sở dữ liệu
    customerModel.findByIdAndDelete(customerid, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            let orders = data.orders;
            orders.forEach(order => {
                orderModel.findByIdAndDelete(order._id, (err, orderData) => {
                    if (error) {
                        return response.status(500).json({
                            status: "Error 500: Internal server error",
                            message: err.message
                        })
                    }
                })
            });
            return response.status(200).json({
                status: "Success: Delete Customer success",
                data: data,
            })
        }
    })
}


module.exports = {
    createCustomer: createCustomer,
    getAllCustomers: getAllCustomers,
    getCustomerById: getCustomerById,
    updateCustomerById: updateCustomerById,
    deleteCustomerById: deleteCustomerById
}