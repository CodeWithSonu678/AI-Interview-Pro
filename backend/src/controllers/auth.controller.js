const authModel = require("../models/auth.model");
const BlackListModel = require("../models/blacklist.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");

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

    res.cookie("token", token);

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

async function googleLogin(req, res) {
  const { token } = req.body;

  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  let user = await authModel.findOne({ email: payload.email });

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

  res.cookie("token", jwt_token);

  res.status(201).json({
    msg: "Login is successfully",
    success: true,
  });
}

module.exports = { regUser, loginUser, logoutUser, getMe, googleLogin };
