const expenseSchema =
    require("../validators/expenseValidator");

const validateExpense = (req, res, next) => {

    const { error } =
        expenseSchema.validate(req.body);

    if (error) {

        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });

    }

    next();
};

module.exports = validateExpense;