const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { JWT_SECRET, GMAIL_USER, GMAIL_PASS, USE_DEV_LOGIN } = require("../config/config");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { Op } = require("sequelize");

const login = async (req, res) => {
  const { username, password } = req.body;

  console.log(`[AUTH] Login attempt: ${username}, DEV_LOGIN=${USE_DEV_LOGIN}`);

  // Dev-only fallback to allow login without DB
  if (USE_DEV_LOGIN && username === "testuser" && password === "test123") {
    console.log("[AUTH] Dev login successful");
    const token = jwt.sign({ id: 999, role: "financial_planner" }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ token, role: "financial_planner", id: 999 });
  }

  console.log("[AUTH] Attempting database login");
  const user = await User.findByUsername(username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    console.log("[AUTH] Login failed: invalid credentials");
    return res.status(401).json({ message: "Invalid credentials" });
  }

  console.log("[AUTH] Database login successful");
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token, role: user.role, id: user.id });
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordToken = resetToken;
    const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour

    // Ensure user ID is valid
    if (!user.id) {
      return res.status(500).json({ message: "Invalid user ID" });
    }

    // Save reset token in the database
    await User.save(resetPasswordToken, resetPasswordExpires, user.id);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });

    const mailOptions = {
      to: user.email,
      from: GMAIL_USER,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested a password reset.\n\n
             Please click on the following link or paste it into your browser to reset your password:\n\n
             http://localhost:5173/reset/${resetToken}\n\n
             If you did not request this, please ignore this email.\n`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error sending email" });
      }
      res.status(200).json({ message: "Reset password link sent to email" });
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    console.log(token, newPassword);
    let resetPasswordExpires = { [Op.gt]: new Date(Date.now()) };
    console.log(new Date(Date.now()));
    // Find user by token and check if it's not expired
    const user = await User.findOne({
      resetPasswordToken: token,
    });

    

    if (!user) {
      return res
        .status(400)
        .json({ message: "Password reset token is invalid or has expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const resetPasswordToken = null;
    resetPasswordExpires = null;

    // Save changes
    await User.savePass(
      resetPasswordToken,
      resetPasswordExpires,
      hashedPassword,
      user.id
    );

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  req.logout();
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { login, forgotPassword, resetPassword, logout };
