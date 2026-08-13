const express = require("express");

const router = express.Router();

// Controllers
const {
    addExpense,
    getAllExpenses,
    getSingleExpense,
    updateExpense
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
    "/",
    protect,
    getSingleExpense
);

router.put(
    "/:id",
    protect,
    validateExpense,
    updateExpense
)

module.exports = router;