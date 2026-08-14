const Expense = require("../models/Expense");
const Income = require("../models/Income");

// ==========================================
// MONTHLY ANALYTICS
// ==========================================

exports.getMonthlyAnalytics = async (req, res) => {

    try {

        res.status(200).json({
            success: true,
            message: "Monthly analytics API working"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ==========================================
// CATEGORY WISE ANALYTICS
// ==========================================

exports.getCategoryAnalytics = async (req, res) => {

    try {

        res.status(200).json({
            success: true,
            message: "Category analytics API working"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ==========================================
// RECENT TRANSACTIONS
// ==========================================

exports.getRecentTransactions = async (req, res) => {

    try {

        const expenses =
            await Expense.find({
                user: req.user._id
            })
            .sort({ createdAt: -1 })
            .limit(5);

        const income =
            await Income.find({
                user: req.user._id
            })
            .sort({ createdAt: -1 })
            .limit(5);

        const transactions = [

            ...expenses.map(item => ({
                title: item.title,
                amount: item.amount,
                type: "expense",
                date: item.date
            })),

            ...income.map(item => ({
                title: item.title,
                amount: item.amount,
                type: "income",
                date: item.date
            }))

        ];

        transactions.sort(
            (a, b) =>
                new Date(b.date) -
                new Date(a.date)
        );

        res.status(200).json({

            success: true,

            count: transactions.length,

            transactions

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};