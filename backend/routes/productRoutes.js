const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Mahsulotlarni boshqarish
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Barcha mahsulotlarni olish
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Mahsulotlar ro'yxati
 *   post:
 *     summary: Yangi mahsulot qo'shish
 *     tags: [Products]
 *     responses:
 *       201:
 *         description: Mahsulot muvaffaqiyatli qo'shildi
 */
router.get("/", productController.getAllProducts);
router.post("/", productController.createProduct);

module.exports = router;
