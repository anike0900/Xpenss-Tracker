const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

// Security
app.use(helmet());

// Logging
app.use(morgan("dev"));

// CORS
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

// ✅ Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// ✅ Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/expenses", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
// Health Check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "XPENSS Tracker API is running 🚀"
    });
});

// Centralized Error Handler
app.use(errorHandler);


module.exports = app;