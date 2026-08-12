const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false,
    },

    profileImage: {
      type: String,
      default: "",
    },

    currency: {
      type: String,
      default: "INR",
    },

    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "light",
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    resetPasswordToken: {
      type: String,
      default: undefined,
    },
    
    resetPasswordExpire: {
      type: Date,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {

    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(     // new add in line 72
      this.password, 
      10
    );
    next();

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);

});

userSchema.methods.comparePassword = async function (enteredPassword) {

    return await bcrypt.compare(
        enteredPassword,
        this.password
    );

};

userSchema.methods.generateToken = function () {

    return jwt.sign(

        {
            id: this._id
        },

        process.env.JWT_SECRET,

        {
            expiresIn: process.env.JWT_EXPIRE
        }

    );

};

module.exports = mongoose.model("User", userSchema);