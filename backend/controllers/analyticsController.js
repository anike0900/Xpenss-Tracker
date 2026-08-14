const Expense = require("../models/Expense");
const Income = require("../models/Income");

// ==========================================
// MONTHLY ANALYTICS
// ==========================================

exports.getMonthlyAnalytics = async (req, res) => {

    try {

        const analytics = await Expense.aggregate([

            {
                $match: {
                    user: req.user._id
                }
            },

            {
                $group: {

                    _id: {
                        month: {
                            $month: "$date"
                        },
                        year: {
                            $year: "$date"
                        }
                    },

                    totalExpense: {
                        $sum: "$amount"
                    }

                }
            },

            {
                $sort: {
                    "_id.year": -1,
                    "_id.month": -1
                }
            }

        ]);

        res.status(200).json({

            success: true,

            analytics

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

// ==========================================
// CATEGORY WISE ANALYTICS
// ==========================================

exports.getCategoryAnalytics = async (req, res) => {

    try {

        const analytics = await Expense.aggregate([

            {
                $match: {
                    user: req.user._id
                }
            },

            {
                $group: {

                    _id: "$category",

                    totalAmount: {
                        $sum: "$amount"
                    },

                    totalTransactions: {
                        $sum: 1
                    }

                }
            },

            {
                $sort: {
                    totalAmount: -1
                }
            }

        ]);

        res.status(200).json({

            success: true,

            analytics

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

// ==========================================
// EXPORT TRANSACTIONS
// ==========================================

exports.exportTransactions = async (req, res) => {

    try {

        res.status(200).json({

            success: true,

            message: "Export Transactions API Working"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};