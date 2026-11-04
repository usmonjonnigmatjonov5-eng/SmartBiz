const productService = require("../services/productService");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const createProduct = catchAsync(async (req, res, next) => {
    const product = await productService.createProduct(req.body);

    res.status(201).json({
        success: true,
        message: "Mahsulot qo'shildi!",
        data: product
    });
});

const getAllProducts = catchAsync(async (req, res, next) => {
    const result = await productService.getAllProducts(req.query);

    res.status(200).json({
        success: true,
        ...result
    });
});

module.exports = {
    createProduct,
    getAllProducts
};