const statisticsService = require("../services/statisticsService");
const catchAsync = require("../utils/catchAsync");

const getStatistics = catchAsync(async (req, res) => {
    const statistics = await statisticsService.getStatistics();

    res.status(200).json({
        success: true,
        data: statistics
    });
});

module.exports = { getStatistics };