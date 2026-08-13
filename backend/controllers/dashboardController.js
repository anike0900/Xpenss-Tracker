const Income = require("../models/Income");
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

// ==========================================
// FINANCE SUMMARY
// ==========================================

exports.getFinanceSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    // Total Income
    const incomeResult = await Income.aggregate([
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

    // Total Expense
    const expenseResult = await Expense.aggregate([
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

    const totalIncome =
      incomeResult.length > 0
        ? incomeResult[0].total
        : 0;

    const totalExpense =
      expenseResult.length > 0
        ? expenseResult[0].total
        : 0;

    // Balance
    const balance =
      totalIncome - totalExpense;

    // Savings Rate
    const savingsRate =
      totalIncome > 0
        ? ((balance / totalIncome) * 100).toFixed(2)
        : 0;

    // Total Transactions
    const totalIncomeTransactions =
      await Income.countDocuments({
        user: userId,
      });

    const totalExpenseTransactions =
      await Expense.countDocuments({
        user: userId,
      });

    const totalTransactions =
      totalIncomeTransactions +
      totalExpenseTransactions;

    res.status(200).json({
      success: true,

      summary: {
        totalIncome,
        totalExpense,
        balance,
        savingsRate,
        totalTransactions,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// MONTHLY ANALYTICS
// ==========================================

exports.getMonthlyAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    // Monthly Income
    const incomeAnalytics =
      await Income.aggregate([
        {
          $match: {
            user: userId,
          },
        },
        {
          $group: {
            _id: {
              year: {
                $year: "$date",
              },
              month: {
                $month: "$date",
              },
            },
            total: {
              $sum: "$amount",
            },
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]);

    // Monthly Expense
    const expenseAnalytics =
      await Expense.aggregate([
        {
          $match: {
            user: userId,
          },
        },
        {
          $group: {
            _id: {
              year: {
                $year: "$date",
              },
              month: {
                $month: "$date",
              },
            },
            total: {
              $sum: "$amount",
            },
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]);

    res.status(200).json({
      success: true,
      incomeAnalytics: formattedIncome,
      expenseAnalytics: formattedExpense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// CATEGORY WISE EXPENSE ANALYTICS
// ==========================================

exports.getCategoryAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    const categories = await Expense.aggregate([
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
          transactions: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
    ]);

    const formattedCategories =
      categories.map((item) => ({
        category: item._id,
        total: item.total,
        transactions: item.transactions,
      }));

    res.status(200).json({
      success: true,
      categories: formattedCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// RECENT TRANSACTIONS
// ==========================================

exports.getRecentTransactions = async (req, res) => {
  try {
    const userId = req.user._id;

    // Recent Incomes
    const incomes = await Income.find({
      user: userId,
    })
      .sort({ createdAt: -1 })
      .limit(10);

    // Recent Expenses
    const expenses = await Expense.find({
      user: userId,
    })
      .sort({ createdAt: -1 })
      .limit(10);

    // Format Incomes
    const formattedIncomes = incomes.map(
      (income) => ({
        _id: income._id,
        type: "income",
        title: income.source,
        amount: income.amount,
        date: income.date,
        createdAt: income.createdAt,
      })
    );

    // Format Expenses
    const formattedExpenses = expenses.map(
      (expense) => ({
        _id: expense._id,
        type: "expense",
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
        date: expense.date,
        createdAt: expense.createdAt,
      })
    );

    // Merge
    const transactions = [
      ...formattedIncomes,
      ...formattedExpenses,
    ];

    // Sort Latest First
    transactions.sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );

    // Top 10 Latest
    const recentTransactions =
      transactions.slice(0, 10);

    res.status(200).json({
      success: true,
      count: recentTransactions.length,
      transactions: recentTransactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};