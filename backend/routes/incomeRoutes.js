const express = require("express");

const router = express.Router();

const protect =
  require("../middleware/authMiddleware");

const {
  addIncome,
  getAllIncome,
} = require("../controllers/incomeController");

const validateIncome =
require("../middleware/validateIncomeMiddleware");

router.post(
  "/",
  protect,
  validateIncome,
  addIncome
);

router.get(
  "/",
  protect,
  getAllIncome
);

module.exports = router;