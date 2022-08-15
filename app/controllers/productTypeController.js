//import ProductTypeModel vào file
const { default: mongoose } = require('mongoose');
const productTypeModel = require('../models/productTypeModel');

//create a productType
const createProductType = (request, response) => {
    //b1: thu thập dữ liệu
    let body = request.body;
    console.log(body);
    //b2: kiểm tra dữ liệu
    if (!body.name) {
        response.status(400).json({
            message: "name is require"
        })
    }
   else {
        //b3: thực hiện
        let productType = {
            _id: mongoose.Types.ObjectId(),
            name:body.name,
            description:body.description
        }
        productTypeModel.create(productType, (error, data) => {
            if (error) {
                response.status(500).json({
                    message: `Internal server error : ${error.message}`
                })
            } else {
                response.status(201).json({
                    data
                })
            }
        });
    }

};

//get All ProductTypes
const getAllProductTypes = (request, response) => {
    //b1: thu thập dữ liệu(bỏ qua)
    //b2: kiểm tra dữ liệu (bỏ qua)
    //b3: thực hiện thao tác dữ liệu
    productTypeModel.find((error, data) => {
        if (error) {
            response.status(500).json({
                message: `Internal server error : ${error.message}`
            })
        }
        else {
            response.status(200).json({
                data
            })
        }
    })
};
//getProductTypeById
const getProductTypeById = (request, response) => {
    //b1: thu thập dữ liệu

    let id = request.params.productTypeid;
    //b2: kiểm tra dữ liệu 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.status(400).json({
            message: "id is invalid!"
        })
    } else {
        //b3: thực hiện thao tác dữ liệu
        productTypeModel.findById(id, (error, data) => {
            if (error) {
                response.status(500).json({
                    message: `Internal server error : ${error.message}`
                })
            }
            else {
                response.status(200).json({
                    data
                })
            }
        })
    }
};

////update ProductType
const updateProductType = (request, response) => {
    //b1: thu thập dữ liệu
    let id = request.params.productTypeid;
    let body = request.body;
    //b2: kiểm tra dữ liệu
    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.status(400).json({
            message: "id is invalid!"
        })
    } else if (!body.name) {
        response.status(400).json({
            message: "name is require"
        })
    } 
    else {
        //b3: thực hiện
        let productType = {
            name:body.name,
            description:body.description
        }
        productTypeModel.findByIdAndUpdate(id, productType, (error, data) => {
            if (error) {
                response.status(500).json({
                    message: `Internal server error : ${error.message}`
                })
            } else {
                response.status(200).json({
                    data
                })
            }
        });
    }
};

//delete ProductType
const deleteProductType = (request, response) => {
    //b1: thu thập
    let id = request.params.productTypeid;
    //b2: kiểm tra
    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.status(400).json({
            message: "id is invalid!"
        })
    } else {
        //b3:
        productTypeModel.findByIdAndDelete(id, (error, data) => {
            if (error) {
                response.status(500).json({
                    message: `Internal server error : ${error.message}`
                })
            } else {
                response.status(200).json({
                    data
                })
            }
        });
    }
}
module.exports = { getAllProductTypes, createProductType, updateProductType, deleteProductType, getProductTypeById }