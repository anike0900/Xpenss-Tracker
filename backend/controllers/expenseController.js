const Expense = require("../models/Expense");

// ==========================================
// ADD EXPENSE
// ==========================================

exports.addExpense = async (req, res) => {

    try {

        const {
            title,
            amount,
            category,
            date,
            note
        } = req.body;

        const expense = await Expense.create({

            user: req.user._id,

            title,

            amount,

            category,

            date,

            note

        });

        res.status(201).json({

            success: true,

            message: "Expense added successfully",

            expense

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================================
// GET ALL EXPENSES
// ==========================================

exports.getAllExpenses = async (req, res) => {

    try {

        const expenses = await Expense.find({

            user: req.user._id

        }).sort({

            date: -1

        });

        res.status(200).json({

            success: true,

            count: expenses.length,

            expenses

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================================
// GET SINGLE EXPENSE
// ==========================================

exports.getSingleExpense = async (req, res) => {

    try {

        const expense = await Expense.findOne({

            _id: req.params.id,

            user: req.user._id

        });

        if (!expense) {

            return res.status(404).json({

                success: false,

                message: "Expense not found"

            });

        }

        res.status(200).json({

            success: true,

            expense

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================================
// UPDATE EXPENSE
// ==========================================

exports.updateExpense = async (req, res) => {

    try {

        const expense = await Expense.findOne({

            _id: req.params.id,

            user: req.user._id

        });

        if (!expense) {

            return res.status(404).json({

                success: false,

                message: "Expense not found"

            });

        }

        const updatedExpense =
            await Expense.findByIdAndUpdate(

                req.params.id,

                req.body,

                {
                    new: true,
                    runValidators: true
                }

            );

        res.status(200).json({

            success: true,

            message: "Expense updated successfully",

            expense: updatedExpense

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================================
// DELETE EXPENSE
// ==========================================

exports.deleteExpense = async (req, res) => {

    try {

        const expense = await Expense.findOne({

            _id: req.params.id,

            user: req.user._id

        });

        if (!expense) {

            return res.status(404).json({

                success: false,

                message: "Expense not found"

            });

        }

        await expense.deleteOne();

        res.status(200).json({

            success: true,

            message: "Expense deleted successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Filter Expenses
exports.filterExpenses = async (req, res, next) => {
  try {
    const { category, minAmount, maxAmount, startDate, endDate } =
      req.query;

    const filter = {
      user: req.user._id,
    };

    // Category Filter
    if (category) {
      filter.category = category;
    }

    // Amount Filter
    if (minAmount || maxAmount) {
      filter.amount = {};

      if (minAmount) {
        filter.amount.$gte = Number(minAmount);
      }

      if (maxAmount) {
        filter.amount.$lte = Number(maxAmount);
      }
    }

    // Date Filter
    if (startDate || endDate) {
      filter.date = {};

      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }

      if (endDate) {
        filter.date.$lte = new Date(endDate);
      }
    }

    const expenses = await Expense.find(filter).sort({
      date: -1,
    });

    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// SEARCH EXPENSES
// ==========================================

exports.searchExpenses = async (req, res) => {
  try {
    const { keyword } = req.query;

    const expenses = await Expense.find({
      user: req.user._id,
      $or: [
        {
          title: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          note: {
            $regex: keyword,
            $options: "i",
          },
        },
      ],
    }).sort({
      date: -1,
    });

    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};