const orderService = require("../services/orderService");
const catchAsync = require("../utils/catchAsync");

const createOrder = catchAsync(async (req, res) => {
    const order = await orderService.createOrder(req.body);

    res.status(201).json({
        success: true,
        message: "Buyurtma muvaffaqiyatli yaratildi!",
        data: order
    });
});

const getAllOrders = catchAsync(async (req, res) => {
    const orders = await orderService.getAllOrders();

    res.status(200).json({
        success: true,
        total: orders.length,
        data: orders
    });
});

const updateOrderStatus = catchAsync(async (req, res) => {
    const order = await orderService.updateOrderStatus(
        req.params.id,
        req.body.status
    );

    res.status(200).json({
        success: true,
        message: "Buyurtma holati yangilandi!",
        data: order
    });
});

module.exports = {
    createOrder,
    getAllOrders,
    updateOrderStatus
};