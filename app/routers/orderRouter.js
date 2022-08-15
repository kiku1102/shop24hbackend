// Import bộ thư viện express
const express = require('express');

const { getAllOrder, createOrderByPhoneNumber, createOrderOfCustomer, getAllOrderOfCustomer, getOrderById, updateOrderById, deleteOrderById } = require("../controllers/orderController");

const orderRouter = express.Router();

orderRouter.post("/customers/:customerId/orders", createOrderOfCustomer);

orderRouter.get("/customers/:customerId/orders", getAllOrderOfCustomer);

orderRouter.get("/orders", getAllOrder);

orderRouter.get("/orders/:orderId", getOrderById);

orderRouter.put("/orders/:orderId", updateOrderById);

orderRouter.delete("/customers/:customerId/orders/:orderId", deleteOrderById);


// Export dữ liệu thành 1 module
module.exports = orderRouter;