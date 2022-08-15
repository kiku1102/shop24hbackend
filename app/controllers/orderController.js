const orderModel = require("../models/orderModel");
const customerModel = require("../models/customerModel");

const mongoose = require("mongoose");

const createOrderOfCustomer = (request, response) => {
    //B1: Chuẩn bị dữ liệu
    let customerId = request.params.customerId;
    let body = request.body;
    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Customer ID is invalid"
        })
    }
    //B3: Thao tác với cơ sở dữ liệu
    let newOrderInput = {
        _id: mongoose.Types.ObjectId(),
        shipperDate: body.shipperDate,
        note: body.note,
        cost: body.cost,
        orderDetail: body.orderDetail,
        customerInfo:body.customerInfo
    }

    orderModel.create(newOrderInput, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            customerModel.findByIdAndUpdate(customerId,
                {
                    $push: { orders: data._id }
                },
                (err, updatedCustomer) => {
                    if (err) {
                        return response.status(500).json({
                            status: "Error 500: Internal server error",
                            message: err.message
                        })
                    } else {
                        return response.status(201).json({
                            status: "Create Order Success",
                            data: data
                        })
                    }
                }
            )
        }
    })
}

const getAllOrderOfCustomer = (request, response) => {
    //B1: Chuẩn bị dữ liệu
    let customerId = request.params.customerId;
    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Customer ID is invalid"
        })
    }
    //B3: Thao tác với cơ sở dữ liệu
    customerModel.findById(customerId)
        .populate("orders")
        .exec((error, data) => {
            if (error) {
                return response.status(500).json({
                    status: "Error 500: Internal server error",
                    message: error.message
                })
            } else {
                return response.status(200).json({
                    status: "Get data success",
                    data: data.orders
                })
            }
        })
}

const getOrderById = (request, response) => {
    //B1: Chuẩn bị dữ liệu
    let orderId = request.params.orderId;
    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Order ID is not valid"
        })
    }
    //B3: Thao tác với cơ sở dữ liệu
    orderModel.findById(orderId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Get order success",
                data: data
            })
        }
    })
}

const updateOrderById = (request, response) => {
    //B1: Chuẩn bị dữ liệu
    let orderId = request.params.orderId;
    let body = request.body;

    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "order ID is not valid"
        })
    }
    //B3: Thao tác với cơ sở dữ liệu
    let orderUpdate = {
        note: body.note,
        cost: body.cost,
        orderDetail: body.orderDetail,
        customerInfo:body.customerInfo
    }

    orderModel.findByIdAndUpdate(orderId, orderUpdate, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Update order success",
                data: data
            })
        }
    })
}

const deleteOrderById = (request, response) => {
    //B1: Chuẩn bị dữ liệu
    let customerId = request.params.customerId;
    let orderId = request.params.orderId;
    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Customer ID is not valid"
        })
    }

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "order ID is not valid"
        })
    }
    //B3: Thao tác với cơ sở dữ liệu
    orderModel.findByIdAndDelete(orderId, (error) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            // Sau khi xóa xong 1 order khỏi collection cần xóa thêm orderID trong customer đang chứa nó
            customerModel.findByIdAndUpdate(customerId,
                {
                    $pull: { orders: orderId }
                },
                (err, updatedCustomer) => {
                    if (err) {
                        return response.status(500).json({
                            status: "Error 500: Internal server error",
                            message: err.message
                        })
                    } else {
                        return response.status(200).json({
                            status: "Success: Delete order success"
                        })
                    }
                })
        }
    })
}

const getAllOrder = (request, response) => {
    //B1: Chuẩn bị dữ liệu
    //B2: Validate dữ liệu
    //B3: Thao tác với cơ sở dữ liệu
    orderModel.find((error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Get order success",
                data: data
            })
        }
    })
}

module.exports = {
    createOrderOfCustomer: createOrderOfCustomer,
    getAllOrderOfCustomer: getAllOrderOfCustomer,
    getOrderById: getOrderById,
    updateOrderById: updateOrderById,
    deleteOrderById: deleteOrderById,
    getAllOrder: getAllOrder
}
