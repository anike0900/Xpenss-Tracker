exports.registerUser = async (req, res) => {

    res.status(200).json({

        success: true,

        message: "Register API Working"

    });

};

exports.loginUser = async (req, res) => {

    res.status(200).json({

        success: true,

        message: "Login API Working"

    });

};

exports.getCurrentUser = async (req, res) => {

    res.status(200).json({

        success: true,

        message: "Current User API Working"

    });

};

exports.logoutUser = async (req, res) => {

    res.status(200).json({

        success: true,

        message: "Logout API Working"

    });

};