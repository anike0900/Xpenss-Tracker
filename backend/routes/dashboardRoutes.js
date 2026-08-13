const express = require("express");
const router = express.Router();

const protect =
  require("../middleware/authMiddleware");

const {
  getDashboardSummary,
  getFinanceSummary,
  getMonthlyAnalytics,
  getCategoryAnalytics,
  getRecentTransactions,
  exportTransactions,
} = require("../controllers/dashboardController");

router.get(
  "/summary",
  protect,
  getDashboardSummary
);

router.get(
  "/finance-summary",
  protect,
  getFinanceSummary
);

router.get(
  "/monthly-analytics",
  protect,
  getMonthlyAnalytics
);

router.get(
  "/category-analytics",
  protect,
  getCategoryAnalytics
);

router.get(
  "/recent-transactions",
  protect,
  getRecentTransactions
);

router.get(
  "/export",
  protect,
  exportTransactions
);

module.exports = router;