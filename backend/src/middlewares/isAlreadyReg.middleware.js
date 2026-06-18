const authModel = require("../models/auth.model");
const BlackListModel = require("../models/blacklist.model");
const jwt = require('jsonwebtoken');

async function isAlreadyReg(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(200).json({
      success: false,
      msg: "Registration/Login is required !",
    });
  }

  try {
    const isBlackList = await BlackListModel.findOne({ token: token });

    if (isBlackList) {
      return res.status(200).json({
        success: false,
        msg: "Token is blocked !",
      });
    }

    const decoded = jwt.verify(token,process.env.SECRET_KEY);

    req.user = decoded;

    next();

  } catch (error) {
    console.log(error.message);
    return res.status(200).json({
      success: false,
      msg: "Database error !",
    });
  }
}

module.exports = { isAlreadyReg };
