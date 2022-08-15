//khai báo thư viện 
const express = require("express");

const productTypeRouter = express.Router();

const {getAllProductTypes, createProductType, updateProductType, deleteProductType, getProductTypeById}=require('../controllers/productTypeController');
//create a productType
productTypeRouter.post("/product_types", createProductType)
//get All ProductType
productTypeRouter.get("/product_types",getAllProductTypes)
//getProductTypeById
productTypeRouter.get("/product_types/:productTypeid",getProductTypeById)
//update productType
productTypeRouter.put("/product_types/:productTypeid",updateProductType)

//delete productType
productTypeRouter.delete("/product_types/:productTypeid", deleteProductType)


module.exports = productTypeRouter;