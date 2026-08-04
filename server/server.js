const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");


const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use("/api/auth", authRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Welcome to XPENSS Tracker API"
    });

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server Running On Port ${PORT}`);

});