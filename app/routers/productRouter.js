//khai báo thư viện 
const express = require("express");

const productRouter = express.Router();
const {createProduct, getAllProducts , getProductById, updateProductById, deleteProductById} = require('../controllers/productController');
//get All Product
productRouter.get("/products", getAllProducts)

//create a product
productRouter.post("/products", createProduct);

//get product by id
productRouter.get("/products/:productId", getProductById);

//update products
productRouter.put("/products/:productid", updateProductById)

//delete product
productRouter.delete("/products/:productid", deleteProductById)

module.exports = productRouter;