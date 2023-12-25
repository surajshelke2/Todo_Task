const { ErrorHandler } = require("../middleware/error");
const User = require("../model/user");
const sendCookie = require("../utils/feactures");

const bcrypt = require("bcrypt");
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {

    next(error);
  }
};

const register = async (req, res,next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exits !!", 404));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

const getMyProfile = (req, res,next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch ({ error }) {
    next(error);
  }
};

const logout = (req, res,next) => {
  try {
    res
      .cookie("token", null, {
        expires: new Date(0),
        httpOnly: true,
        sameSite: process.env.NODE_ENV=="Development"?'lax':'none',
        secure: process.env.NODE_ENV=="Development"?'false':'true',
      })
      .status(200)
      .json({
        success: true,
        message: "User is Successfully Logout!!",
       
      });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, getMyProfile, login, logout };
