const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },

    googleId: {
      type: String,
      default: null,
    },

    avatar: {
      type: String,
    },

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    userPlan: {
      type: String,
      enum: ["free", "pro", "premium"],
      default: "free",
    },

    reportLimit: {
      type: Number,
      default: 1,
    },

    reportsUsed: {
      type: Number,
      default: 0,
    },

    subscriptionStatus: {
      type: String,
      enum: ["active", "expired"],
      default: "active",
    },

    planExpiresAt: {
      type: Date,
    },

    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
  },
  { timestamps: true },
);

const authModel = mongoose.model("User", authSchema);

module.exports = authModel;
