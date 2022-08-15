//import productModel vào file
const { default: mongoose } = require("mongoose");
const productModel = require("../models/productModel");

const createProduct = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let body = request.body;
  //B2: Validate dữ liệu
  if (!body.name) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "name is invalid",
    });
  }
  if (!body.type || !mongoose.Types.ObjectId.isValid(body.type)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "typeID is invalid",
    });
  }
  if (!body.imageUrl) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "imageUrl is invalid",
    });
  }
  if (!body.buyPrice) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "buyPrice is invalid",
    });
  }

  //B3: Thao tác với cơ sở dữ liệu
  let newInput = {
    _id: mongoose.Types.ObjectId(),
    name: body.name,
    type: body.type,
    imageUrl: body.imageUrl,
    buyPrice: body.buyPrice,
    description: body.description,
    amount: body.amount
  };

  productModel.create(newInput, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message,
      });
    } else {
      return response.status(201).json({
        status: "Create Product Success",
        data: data,
      });
    }
  });
};

const getAllProducts = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  const { limit, skip, name, type, promotionPriceMin, promotionPriceMax } =
    request.query;
  const condition = {};
  //B2: Validate dữ liệu
  if (name) {
    const regex = new RegExp(`${name}`);
    condition.name = regex;
  }
  if (type) {
    condition.type = type;
  }
  if (promotionPriceMin) {
    condition.buyPrice = {
      ...condition.buyPrice,
      $gte: promotionPriceMin,
    };
  }

  if (promotionPriceMax) {
    condition.buyPrice = {
      ...condition.buyPrice,
      $lte: promotionPriceMax,
    };
  }
  //B3: Thao tác với cơ sở dữ liệu
  productModel
    .find(condition)
    .limit(limit)
    .skip(skip)
    .exec((error, data) => {
      if (error) {
        return response.status(500).json({
          status: "Error 500: Internal server error",
          message: error.message,
        });
      } else {
        return response.status(200).json({
          data: data,
        });
      }
    });
};

const getProductById = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let productId = request.params.productId;
  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "productId is not valid",
    });
  }
  //B3: Thao tác với cơ sở dữ liệu
  productModel.findById(productId, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message,
      });
    } else {
      return response.status(200).json({
        status: "Success: Get Product success",
        data: data,
      });
    }
  });
};

const updateProductById = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let productId = request.params.productid;
  let body = request.body;

  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "product Id is not valid",
    });
  }
  if (!body.name) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "name is invalid",
    });
  }
  if (!body.type || !mongoose.Types.ObjectId.isValid(body.type)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "typeID is invalid",
    });
  }
  if (!body.imageUrl) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "imageUrl is invalid",
    });
  }
  if (!body.buyPrice) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "buyPrice is invalid",
    });
  }
  //B3: Thao tác với cơ sở dữ liệu
  let productUpdate = {
    name: body.name,
    type: body.type,
    imageUrl: body.imageUrl,
    buyPrice: body.buyPrice,
    description: body.description,
  };

  productModel.findByIdAndUpdate(productId, productUpdate, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message,
      });
    } else {
      return response.status(200).json({
        status: "Success: Update product success",
        data: data,
      });
    }
  });
};

const deleteProductById = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let productid = request.params.productid;
  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(productid)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "product Id is not valid",
    });
  }
  //B3: Thao tác với cơ sở dữ liệu
  productModel.findByIdAndDelete(productid, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message,
      })
    }
    return response.status(200).json({
      status: "Success: Delete Product success",
      message: "Delete success"
    });
  });
};

module.exports = {
  createProduct: createProduct,
  getAllProducts: getAllProducts,
  getProductById: getProductById,
  updateProductById: updateProductById,
  deleteProductById: deleteProductById,
};
