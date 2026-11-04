const Product = require("../models/Product");
const Order = require("../models/Order");

const getStatistics = async () => {
    // Mahsulotlar statistikasi
    const productStats = await Product.aggregate([
        {
            $group: {
                _id: null,
                totalProducts: { $sum: 1 },
                totalQuantity: { $sum: "$quantity" },
                totalInventoryValue: {
                    $sum: {
                        $multiply: ["$price", "$quantity"]
                    }
                }
            }
        }
    ]);

    // Buyurtmalar statistikasi
    const orderStats = await Order.aggregate([
        {
            $facet: {
                totalOrders: [
                    {
                        $count: "count"
                    }
                ],
                ordersByStatus: [
                    {
                        $group: {
                            _id: "$status",
                            count: { $sum: 1 }
                        }
                    }
                ],
                completedSales: [
                    {
                        $match: {
                            status: "completed"
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            totalSales: {
                                $sum: "$totalPrice"
                            }
                        }
                    }
                ]
            }
        }
    ]);

    const products = productStats[0] || {
        totalProducts: 0,
        totalQuantity: 0,
        totalInventoryValue: 0
    };

    const orders = orderStats[0] || {};

    return {
        products: {
            totalProducts: products.totalProducts || 0,
            totalQuantity: products.totalQuantity || 0,
            totalInventoryValue: products.totalInventoryValue || 0
        },
        orders: {
            totalOrders: orders.totalOrders?.[0]?.count || 0,
            ordersByStatus: orders.ordersByStatus || [],
            totalSales: orders.completedSales?.[0]?.totalSales || 0
        }
    };
};

module.exports = { getStatistics };