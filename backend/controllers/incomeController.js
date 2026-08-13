// Income Controller

exports.addIncome = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Income controller working",
  });
};