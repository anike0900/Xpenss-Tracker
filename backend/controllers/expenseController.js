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