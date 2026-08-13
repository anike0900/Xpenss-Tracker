const express = require("express");

const router = express.Router();

// Controllers
const {
    addExpense,
    getAllExpenses,
    getSingleExpense,
    updateExpense,
    deleteExpense,
    filterExpenses,
    searchExpenses,
} = require("../controllers/expenseController");

// Middleware
const protect = require("../middleware/authMiddleware");

const validateExpense =
    require("../middleware/validateExpenseMiddleware");


// ==========================================
// ADD EXPENSE
// ==========================================

router.post(
    "/",
    protect,
    validateExpense,
    addExpense
);

router.get(
    "/",
    protect,
    getAllExpenses
);

router.get(
    "/:id",
    protect,
    getSingleExpense
);

router.get(
  "/filter",
  protect,
  filterExpenses
);

router.get(
  "/search",
  protect,
  searchExpenses
);

router.put(
    "/:id",
    protect,
    validateExpense,
    updateExpense
);

router.delete(
    "/:id",
    protect,
    deleteExpense
);

module.exports = router;