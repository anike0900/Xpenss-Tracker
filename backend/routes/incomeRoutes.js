const express = require("express");

const router = express.Router();

const protect =
  require("../middleware/authMiddleware");

const {
  addIncome,
} = require("../controllers/incomeController");

router.post(
  "/",
  protect,
  addIncome
);

module.exports = router;