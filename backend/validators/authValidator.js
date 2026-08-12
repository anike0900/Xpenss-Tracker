const { body } = require("express-validator");


// ===============================
// REGISTER VALIDATION
// ===============================

const registerValidation = [

    body("fullName")
        .trim()
        .notEmpty()
        .withMessage("Full name is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("Full name must be between 3 and 50 characters"),


    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email")
        .normalizeEmail(),


    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")

];


// ===============================
// LOGIN VALIDATION
// ===============================

const loginValidation = [

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email")
        .normalizeEmail(),


    body("password")
        .notEmpty()
        .withMessage("Password is required")

];

const resetPasswordValidation = [
    body("password")
       .isLength({ min: 8})
       .withMessage("Password must be at least 8 characters")

    // .isStrongPassword({
    //      minLength: 8,
    //      minLowercase: 1,
    //      minUppercase: 1,
    //      minNumbers: 1,
    //      minSymbols: 0
    // })
];

module.exports = {
    registerValidation,
    loginValidation
};