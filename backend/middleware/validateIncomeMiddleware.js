const validateIncome = (req, res, next) => {
  const { source, amount } = req.body;

  if (!source || !amount) {
    return res.status(400).json({
      success: false,
      message: "Source and amount are required",
    });
  }

  if (amount <= 0) {
    return res.status(400).json({
      success: false,
      message: "Amount must be greater than 0",
    });
  }

  next();
};

module.exports = validateIncome;