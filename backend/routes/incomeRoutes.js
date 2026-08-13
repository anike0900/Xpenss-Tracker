const express = require("express");

const router = express.Router();

const protect =
  require("../middleware/authMiddleware");

const {
  addIncome,
} = require("../controllers/incomeController");

const validateIncome =
require("../middleware/validateIncomeMiddleware");

router.post(
  "/",
  protect,
  validateIncome,
  addIncome
);

module.exports = router;