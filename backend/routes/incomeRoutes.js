const express = require("express");

const router = express.Router();

const protect =
  require("../middleware/authMiddleware");

const {
   addIncome,
   getAllIncome,
   getSingleIncome,
   updateIncome,
   deleteIncome,
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


router.get(
  "/:id",
  protect,
  getSingleIncome
);

router.put(
  "/:id",
  protect,
  validateIncome,
  updateIncome
);

router.delete(
  "/:id",
  protect,
  deleteIncome
);

module.exports = router;