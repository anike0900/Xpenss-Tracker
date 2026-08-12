const express = require("express");

const router = express.Router();


// ==========================================
// Controllers
// ==========================================

const {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser,
    forgotPassword,
    resetPassword
} = require("../controllers/authController");

console.log("forgotPassword:", forgotPassword);


// ==========================================
// Authentication Middleware
// ==========================================

const protect =
    require("../middleware/authMiddleware");


// ==========================================
// Validation
// ==========================================

const {
    registerValidation,
    loginValidation
} = require("../validators/authValidator");

const validate =
    require("../middleware/validationMiddleware");


const {
    forgotPasswordLimiter
} = require("../middleware/rateLimitMiddleware");
// ==========================================
// REGISTER
// ==========================================

router.post(
    "/register",
    registerValidation,
    validate,
    registerUser
);


// ==========================================
// LOGIN
// ==========================================

router.post(
    "/login",
    loginValidation,
    validate,
    loginUser
);


// ==========================================
// FORGOT PASSWORD
// ==========================================

router.post(
    "/forgot-password",
    forgotPasswordLimiter,
    forgotPassword
);

router.post (
    "/reset-password/:token",
    resetPassword
);

// ==========================================
// CURRENT USER
// ==========================================

router.get(
    "/me",
    protect,
    getCurrentUser
);


// ==========================================
// LOGOUT
// ==========================================

router.post(
    "/logout",
    logoutUser
);


// ==========================================
// EXPORT ROUTER
// ==========================================

module.exports = router;
