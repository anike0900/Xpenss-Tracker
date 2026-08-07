const User = require("../models/User");
exports.registerUser = async (req, res) => {

    try {
         
        console.log(req.body);
        const { fullName, email, password } = req.body;

        // Basic validation
        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Create user
        const user = await User.create({
            fullName,
            email,
            password
        });

        // Generate JWT
        const token = user.generateToken();

        res.status(201).json({
            success: true,
            message: "Registration successful",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                currency: user.currency,
                theme: user.theme
            }
        });

    // } catch (error) {

    //     res.status(500).json({
    //         success: false,
    //         message: error.message
    //     });

    // }
    } catch (error) {
    console.error("🔥 Full Error:", error);

    res.status(500).json({
        success: false,
        message: error.message
    });
}

};

exports.loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        // Find User
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        // Compare Password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        // Generate Token
        const token = user.generateToken();

        res.status(200).json({
            success: true,
            message: "Login Successful",
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

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

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
                isEmailVerified: req.user.isEmailVerified
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.logoutUser = async (req, res) => {

    res.status(200).json({

        success: true,

        message: "Logout API Working"

    });

};