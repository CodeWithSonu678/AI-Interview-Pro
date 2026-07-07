const authModel = require("../models/auth.model");
const BlackListModel = require("../models/blacklist.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");
const crypto = require("crypto");
const { sendResetMail } = require("../services/forgotMail.service");

//register controller

async function regUser(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      msg: "All fields are required !",
      success: false,
    });
  }

  try {
    const isAlreadyReg = await authModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isAlreadyReg) {
      return res.status(409).json({
        msg: "You are already registered !",
        success: false,
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await authModel.create({
      username,
      email,
      password: hash,
    });

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.SECRET_KEY,
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // HTTPS ke liye
      sameSite: "none", // Vercel ↔ Render cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      msg: "Registration is successfully",
      success: true,
    });
  } catch (error) {
    console.log(error.message);

    res.status(401).json({
      msg: "Unauthorized Access denied!",
      success: false,
    });
  }
}

//Login controller

async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "All fields are required !",
      success: false,
    });
  }

  try {
    const user = await authModel.findOne({ email: email });

    if (!user) {
      return res.status(200).json({
        msg: "Invalid email or password !",
        success: false,
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        msg: "Invalid Password !",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.SECRET_KEY,
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // HTTPS ke liye
      sameSite: "none", // Vercel ↔ Render cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      msg: "Login is successfully",
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({
      msg: "Unauthorized Access denied!",
      success: false,
    });
  }
}

//Forgot Password

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await authModel.findOne({ email });

    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          "If an account with that email exists, we've sent a password reset link.",
      });
    }

    if (user.resetPasswordToken && user.resetPasswordExpire > Date.now()) {
      return res.status(429).json({
        success: false,
        message:
          "A password reset link has already been sent. Please check your email or wait 15 minutes before requesting another.",
      });
    }

    // user date update
    user.resetPasswordToken = hashResetToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    //url for mail
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendResetMail({ resetUrl, email: user.email });

    res.status(200).json({
      success: true,
      message: "Password reset link sent successfully.",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to send reset link",
    });
  }
}

async function resetPassword(req, res) {
  try {
    const { newPassword } = req.body;
    const { resetToken } = req.params;

    const hashResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await authModel.findOne({
      resetPasswordToken: hashResetToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    //agar user exist na karta ho or token expire ho gya ho toh return sms

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token !",
      });
    }

    //convert normal password to hash password
    const hashNewPassword = await bcrypt.hash(newPassword, 10);

    //update user details
    user.password = hashNewPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.clearCookie("token");

    res.status(201).json({
      success: true,
      message:
        "Password reset successfully. Please login with your new password.",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Failed reset password.",
    });
  }
}

//User logout

async function logoutUser(req, res) {
  const token = req.cookies.token;

  try {
    const info = await BlackListModel.create({
      token: token,
    });

    res.clearCookie("token");

    res.status(201).json({
      success: true,
      msg: "Logout is successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Server Error !",
      success: false,
    });
  }
}

// User data

async function getMe(req, res) {
  try {
    const info = await authModel.findById({ _id: req.user.id });

    res.status(200).json({
      success: true,
      msg: "User info fetch is successfully",
      user: {
        id: info._id,
        username: info.username,
        email: info.email,
        userPlan: info.userPlan,
        reportsUsed: info.reportsUsed,
        reportLimit: info.reportLimit,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({
      msg: "Server Error !",
      success: false,
    });
  }
}

//Google Button

async function googleLogin(req, res) {
  const { token } = req.body;

  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const user = await authModel.findOne({ email: payload.email });

  if (!user) {
    user = await authModel.create({
      username: payload.name,
      email: payload.email,
      password: null,
      googleId: payload.sub,
      avatar: payload.picture,
      provider: "google",
    });
  }

  const jwt_token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.SECRET_KEY,
  );

  res.cookie("token", jwt_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    msg: "Login is successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      userPlan: user.userPlan,
      reportsUsed: user.reportsUsed,
      reportLimit: user.reportLimit,
    },
  });
}

module.exports = {
  regUser,
  loginUser,
  forgotPassword,
  resetPassword,
  logoutUser,
  getMe,
  googleLogin,
};
