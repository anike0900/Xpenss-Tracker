const User = require("../models/User");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// ==========================================================
// REGISTER USER
// ==========================================================

exports.registerUser = async (req, res) => {

    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: "Email already registered"
        });
    }

    const user = await User.create({
        fullName,
        email,
        password
    });

    const token = user.generateToken();

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
        success: true,
        message: "Registration successful",
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            currency: user.currency,
            theme: user.theme
        }
    });
};


// ==========================================================
// LOGIN USER
// ==========================================================

exports.loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User
            .findOne({ email })
            .select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        const isMatch =
            await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        const token = user.generateToken();

        res.status(200).json({

            success: true,

            message: "Login successful",

            token,

            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                currency: user.currency,
                theme: user.theme
            }

        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ==========================================================
// GET CURRENT USER
// ==========================================================

exports.getCurrentUser = async (req, res) => {

    try {

        res.status(200).json({

            success: true,

            user: {
                id: req.user._id,
                fullName: req.user.fullName,
                email: req.user.email,
                profileImage: req.user.profileImage,
                currency: req.user.currency,
                theme: req.user.theme,
                isEmailVerified:
                    req.user.isEmailVerified
            }

        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ==========================================================
// LOGOUT USER
// ==========================================================

exports.logoutUser = async (req, res) => {

    try {

        res.clearCookie("token", {

            httpOnly: true,

            secure:
                process.env.NODE_ENV === "production",

            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax"

        });

        res.status(200).json({
            success: true,
            message: "Logout Successful"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ==========================================================
// FORGOT PASSWORD
// ==========================================================

exports.forgotPassword = async (req, res, next) => {

    try {

        const { email } = req.body;


        // ------------------------------------------
        // Validate email
        // ------------------------------------------

        if (!email) {

            return res.status(400).json({
                success: false,
                message: "Email is required"
            });

        }


        // ------------------------------------------
        // Find user
        // ------------------------------------------

        const user = await User.findOne({
            email: email.toLowerCase().trim()
        });


        if (!user) {

            return res.status(200).json({
                success: true,
                message:
                    "If an account exists with this email, a password reset link has been generated."
            });

        }


        // ------------------------------------------
        // Generate reset token
        // ------------------------------------------

        const resetToken =
            crypto.randomBytes(32).toString("hex");


        // ------------------------------------------
        // Hash token
        // ------------------------------------------

        const hashedToken =
            crypto
                .createHash("sha256")
                .update(resetToken)
                .digest("hex");


        // ------------------------------------------
        // Save token + expiry
        // ------------------------------------------

        user.resetPasswordToken =
            hashedToken;

        user.resetPasswordExpire =
            Date.now() + 15 * 60 * 1000;


        await user.save({
            validateBeforeSave: false
        });


        // ------------------------------------------
        // Development reset URL
        // ------------------------------------------

        const resetUrl =
            `http://127.0.0.1:5500/frontend/reset-password.html?token=${resetToken}`;


        // ------------------------------------------
        // Response
        // ------------------------------------------

        return res.status(200).json({

            success: true,

            message:
                "Password reset link generated successfully",

            resetUrl

        });

    } catch (error) {

        next(error);

    }

};

// ==========================================================
// RESET PASSWORD
// ==========================================================

exports.resetPassword = async (req, res, next) => {

    try {

        const { token } = req.params;

        const { password } = req.body;


        // ==========================================
        // Token Check
        // ==========================================

        if (!token) {

            return res.status(400).json({
                success: false,
                message: "Reset token is required"
            });

        }


        // ==========================================
        // Password Check
        // ==========================================

        if (!password) {

            return res.status(400).json({
                success: false,
                message: "New password is required"
            });

        }


        // ==========================================
        // Hash Incoming Token
        // ==========================================

        const hashedToken =
            crypto
                .createHash("sha256")
                .update(token)
                .digest("hex");


        // ==========================================
        // Find User
        // ==========================================

        const user = await User.findOne({

            resetPasswordToken: hashedToken,

            resetPasswordExpire: {
                $gt: Date.now()
            }

        });


        // ==========================================
        // Invalid / Expired Token
        // ==========================================

        if (!user) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid or expired password reset token"

            });

        }


        // ==========================================
        // Update Password
        // ==========================================

        user.password = password;


        // ==========================================
        // Remove Reset Token
        // ==========================================

        user.resetPasswordToken = undefined;

        user.resetPasswordExpire = undefined;


        await user.save();


        // ==========================================
        // Success
        // ==========================================

        return res.status(200).json({

            success: true,

            message:
                "Password reset successful"

        });

    } catch (error) {

        next(error);

    }

};