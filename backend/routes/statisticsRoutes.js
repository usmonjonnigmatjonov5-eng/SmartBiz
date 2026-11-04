
const express = require("express");
const router = express.Router();
const statisticsController = require("../controllers/statisticsController");

/**
 * @swagger
 * tags:
 *   - name: Statistics
 *     description: Do'kon statistikasi
 */

/**
 * @swagger
 * /statistics:
 *   get:
 *     summary: Do'kon statistikasini olish
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Statistika muvaffaqiyatli olindi
 *       500:
 *         description: Server xatosi
 */
router.get("/", statisticsController.getStatistics);

module.exports = router;
