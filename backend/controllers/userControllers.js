// userController.js
import { User } from "../models/user.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/features.js";
import { compare } from "bcryptjs";


// Register User
const registerUser = TryCatch(async (req, res, next) => {
  const { name, email, password } = req.body;
  // const profilePicture = req.file;

  if (!name || !email || !password) {
    return next(new ErrorHandler(400, "All fields are required"));
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler(400, "User already exists"));
  }

  user = await User.create({
    name,
    email,
    password,
  });

  sendToken(res, user, 201, "User registered successfully");
});

// Login User
const loginUser = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler(400, "Please enter email & password"));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler(404, "Invalid email or password"));

  const isMatch = await compare(password, user.password);
  if (!isMatch) return next(new ErrorHandler(401, "Invalid email or password"));

  sendToken(res, user, 200, `Logged in successfully as ${email}`);
});

// Get Logged-in User
const getMe = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user).select("-password");
  if (!user) return next(new ErrorHandler(404, "User not found"));
  return res.status(200).json({ success: true, user });
});

// Update User
const updateUser = TryCatch(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  });
  return res
    .status(200)
    .json({ success: true, message: "Profile updated", user });
});

// Delete User
const deleteUser = TryCatch(async (req, res, next) => {
  await User.findByIdAndDelete(req.user.id);
  return res
    .status(200)
    .json({ success: true, message: "User deleted successfully" });
});

// Forgot Password
const forgotPassword = TryCatch(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return next(new ErrorHandler(404, "User not found"));

  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  await user.save();

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/reset/${resetToken}`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message: `Click the link to reset your password: ${resetUrl}`,
    });
    res
      .status(200)
      .json({ success: true, message: "Password reset link sent" });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return next(new ErrorHandler(500, "Email could not be sent"));
  }
});

// Reset Password
const resetPassword = TryCatch(async (req, res, next) => {
  const resetToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    return next(new ErrorHandler(400, "Invalid or expired reset token"));

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  return res
    .status(200)
    .json({ success: true, message: "Password reset successfully" });
});

export {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
};
