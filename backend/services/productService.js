const AppError = require("../utils/AppError");
const Product = require("../models/Product");

const createProduct = async (productData) => {
    const { name, price, category, quantity } = productData;

    if (!name || !name.trim() || !category || !category.trim()) {
        throw new AppError(
            "Mahsulot nomi va kategoriyasi kiritilishi shart!",
            400
        );
    }

    if (price === undefined || !Number.isFinite(Number(price)) || Number(price) < 0) {
        throw new AppError("Mahsulot narxi noto'g'ri!", 400);
    }

    if (quantity === undefined || !Number.isInteger(Number(quantity)) || Number(quantity) < 0) {
        throw new AppError("Mahsulot miqdori noto'g'ri!", 400);
    }

    return await Product.create(productData);
};

const getAllProducts = async (query) => {
    const {
        search,
        category,
        sort,
        page = 1,
        limit = 10
    } = query;

    const filter = {};

    if (search) {
        filter.name = {
            $regex: search,
            $options: "i"
        };
    }

    if (category) {
        filter.category = category;
    }

    const currentPage = Math.max(1, Number(page) || 1);
    const perPage = Math.max(1, Math.min(100, Number(limit) || 10));
    const skip = (currentPage - 1) * perPage;

    let sortOption = { createdAt: -1 };

    if (sort === "price") {
        sortOption = { price: 1 };
    } else if (sort === "-price") {
        sortOption = { price: -1 };
    }

    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(perPage);

    return {
        total,
        page: currentPage,
        limit: perPage,
        totalPages: Math.ceil(total / perPage),
        data: products
    };
};

module.exports = {
    createProduct,
    getAllProducts
};
