require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

const connectDB = require("./config/db");
const swaggerSpec = require("./config/swagger");
const logger = require("./utils/logger");
const errorHandler = require("./middleware/errorHandler");

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const statisticsRoutes = require("./routes/statisticsRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

morgan.token("clean-url", (req) => req.path);
app.use(morgan(":method :clean-url :status :response-time ms"));

app.get("/", (req, res) => {
    res.json({
        message: "SmartBiz Backend ishlayapti!"
    });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/statistics", statisticsRoutes);

app.use(errorHandler);

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            logger.info(`Server http://localhost:${PORT} da ishlayapti`);
        });
    } catch (error) {
        logger.error("Serverni ishga tushirishda xatolik:", error);
        process.exit(1);
    }
};

startServer();
