const Joi = require("joi");

const expenseSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required(),

    amount: Joi.number()
        .positive()
        .required(),

    category: Joi.string()
        .trim()
        .required(),

    date: Joi.date(),

    note: Joi.string()
        .allow("")
        .max(500)
});

module.exports = expenseSchema;