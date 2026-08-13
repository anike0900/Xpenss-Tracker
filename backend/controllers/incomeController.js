const Income = require("../models/Income");

// ==========================================
// ADD INCOME
// ==========================================

exports.addIncome = async (req, res) => {
  try {
    const {
      source,
      amount,
      date,
      note,
    } = req.body;

    const income = await Income.create({
      user: req.user._id,
      source,
      amount,
      date,
      note,
    });

    res.status(201).json({
      success: true,
      message: "Income added successfully",
      income,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};