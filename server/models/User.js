const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    profileImage: {
      type: String,
      default: ""
    },

    monthlyBudget: {
      type: Number,
      default: 0
    },

    currency: {
      type: String,
      default: "INR"
    }

  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);