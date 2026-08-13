const express = require("express");
const router = express.Router();

const protect =
  require("../middleware/authMiddleware");

const {
  getDashboardSummary,
  getFinanceSummary,
  getMonthlyAnalytics,
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

module.exports = router;