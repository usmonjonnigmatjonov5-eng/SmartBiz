
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: Buyurtmalarni boshqarish
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Barcha buyurtmalarni olish
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Buyurtmalar ro'yxati
 *   post:
 *     summary: Yangi buyurtma yaratish
 *     tags: [Orders]
 *     responses:
 *       201:
 *         description: Buyurtma yaratildi
 */
router.post("/", orderController.createOrder);
router.get("/", orderController.getAllOrders);

/**
 * @swagger
 * /orders/{id}/status:
 *   patch:
 *     summary: Buyurtma holatini o'zgartirish
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, completed, cancelled]
 *     responses:
 *       200:
 *         description: Buyurtma holati yangilandi
 */
router.patch("/:id/status", orderController.updateOrderStatus);

module.exports = router;
