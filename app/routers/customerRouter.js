//khai báo thư viện 
const express = require("express");

const customerRouter = express.Router();
const { createCustomer, getAllCustomers, getCustomerById, updateCustomerById, deleteCustomerById } = require('../controllers/customerController');
//get All Customer
customerRouter.get("/customers", getAllCustomers)

//create a customer
customerRouter.post("/customers", createCustomer);

//get customer by id
customerRouter.get("/customers/:customerId", getCustomerById);


//update customers
customerRouter.put("/customers/:customerid", updateCustomerById)

//delete customer
customerRouter.delete("/customers/:customerid", deleteCustomerById)

module.exports = customerRouter;