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

// ==========================================
// GET ALL INCOME
// ==========================================

exports.getAllIncome = async (req, res) => {
  try {
    const incomes = await Income.find({
      user: req.user._id,
    }).sort({
      date: -1,
    });

    res.status(200).json({
      success: true,
      count: incomes.length,
      incomes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET SINGLE INCOME
// ==========================================

exports.getSingleIncome = async (req, res) => {
  try {
    const income = await Income.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }

    res.status(200).json({
      success: true,
      income,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// UPDATE INCOME
// ==========================================

exports.updateIncome = async (req, res) => {
  try {
    const income = await Income.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }

    const updatedIncome =
      await Income.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      message: "Income updated successfully",
      income: updatedIncome,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};