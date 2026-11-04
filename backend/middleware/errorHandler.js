const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || "error";

    logger.error({
        message: err.message,
        method: req.method,
        url: req.originalUrl,
        statusCode
    });

    res.status(statusCode).json({
        success: false,
        status,
        message: err.isOperational
            ? err.message
            : "Serverda kutilmagan xatolik yuz berdi!"
    });
};

module.exports = errorHandler;