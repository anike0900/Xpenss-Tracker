const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getMonthlyAnalytics,
    getCategoryAnalytics,
    getRecentTransactions,
    exportTransactions
} = require("../controllers/analyticsController");


router.get(
    "/export",
    protect,
    exportTransactions
);

router.get(
    "/monthly",
    protect,
    getMonthlyAnalytics
);

router.get(
    "/category-wise",
    protect,
    getCategoryAnalytics
);

router.get(
    "/recent-transactions",
    protect,
    getRecentTransactions
);

module.exports = router;