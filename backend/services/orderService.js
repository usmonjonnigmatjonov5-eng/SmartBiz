const AppError = require("../utils/AppError");
const Order = require("../models/Order");
const Product = require("../models/Product");

const createOrder = async (orderData) => {
    const { products } = orderData;

    if (!Array.isArray(products) || products.length === 0) {
        throw new AppError(
            "Buyurtmada kamida bitta mahsulot bo'lishi kerak!",
            400
        );
    }

    let totalPrice = 0;
    const orderProducts = [];

    for (const item of products) {
        if (!Number.isInteger(item.quantity) || item.quantity < 1) {
            throw new AppError(
                "Mahsulot miqdori kamida 1 bo'lishi kerak!",
                400
            );
        }

        const product = await Product.findById(item.product);

        if (!product) {
            throw new AppError("Mahsulot topilmadi!", 404);
        }

        if (product.quantity < item.quantity) {
            throw new AppError(
                `${product.name} uchun mahsulot yetarli emas!`,
                400
            );
        }

        totalPrice += product.price * item.quantity;

        orderProducts.push({
            product: product._id,
            quantity: item.quantity
        });
    }

    return await Order.create({
        products: orderProducts,
        totalPrice
    });
};

const getAllOrders = async () => {
    return await Order.find()
        .populate("products.product")
        .sort({ createdAt: -1 });
};

const updateOrderStatus = async (orderId, status) => {
    const allowedStatuses = ["pending", "completed", "cancelled"];

    if (!allowedStatuses.includes(status)) {
        throw new AppError("Buyurtma holati noto'g'ri!", 400);
    }

    const session = await Order.startSession();

    try {
        let updatedOrder;

        await session.withTransaction(async () => {
            const order = await Order.findById(orderId).session(session);

            if (!order) {
                throw new AppError("Buyurtma topilmadi!", 404);
            }

            if (order.status === status) {
                updatedOrder = order;
                return;
            }

            if (order.status !== "pending") {
                throw new AppError(
                    "Bu buyurtma holatini qayta o'zgartirib bo'lmaydi!",
                    400
                );
            }

            if (status === "completed") {
                for (const item of order.products) {
                    const result = await Product.updateOne(
                        {
                            _id: item.product,
                            quantity: { $gte: item.quantity }
                        },
                        {
                            $inc: { quantity: -item.quantity }
                        },
                        { session }
                    );

                    if (result.modifiedCount !== 1) {
                        throw new AppError(
                            "Mahsulot topilmadi yoki omborda yetarli miqdor yo'q!",
                            400
                        );
                    }
                }
            }

            order.status = status;
            await order.save({ session });

            updatedOrder = order;
        });

        return updatedOrder;
    } finally {
        await session.endSession();
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    updateOrderStatus
};
