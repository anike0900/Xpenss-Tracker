const Expense = require("../models/Expense");

// ==========================================
// DASHBOARD SUMMARY
// ==========================================

exports.getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    // Total Expenses
    const totalExpensesResult = await Expense.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const totalExpenses =
      totalExpensesResult.length > 0
        ? totalExpensesResult[0].total
        : 0;

    // Current Month Expenses
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );

    const monthlyExpensesResult =
      await Expense.aggregate([
        {
          $match: {
            user: userId,
            date: {
              $gte: startOfMonth,
            },
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$amount",
            },
          },
        },
      ]);

    const monthlyExpenses =
      monthlyExpensesResult.length > 0
        ? monthlyExpensesResult[0].total
        : 0;

    // Total Transactions
    const totalTransactions =
      await Expense.countDocuments({
        user: userId,
      });

    // Highest Expense
    const highestExpense =
      await Expense.findOne({
        user: userId,
      }).sort({
        amount: -1,
      });

    // Recent Expenses
    const recentExpenses =
      await Expense.find({
        user: userId,
      })
        .sort({
          createdAt: -1,
        })
        .limit(5);

    // Category Stats
    const categoryStats =
      await Expense.aggregate([
        {
          $match: {
            user: userId,
          },
        },
        {
          $group: {
            _id: "$category",
            total: {
              $sum: "$amount",
            },
          },
        },
        {
          $sort: {
            total: -1,
          },
        },
      ]);

    res.status(200).json({
      success: true,

      summary: {
        totalExpenses,
        monthlyExpenses,
        totalTransactions,
      },

      highestExpense,
      recentExpenses,
      categoryStats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};