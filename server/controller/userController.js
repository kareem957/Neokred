const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    const { fullName, username, email, password, dateOfBirth, phoneNumber, address, city, state, zipCode, country, securityQuestion, securityAnswer } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
      dateOfBirth,
      phoneNumber,
      address,
      city,
      state,
      zipCode,
      country,
      securityQuestion,
      securityAnswer,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ error: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: "Invalid password" });

    // Create and sign JWT token with a 5-minute expiration
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "5m" });

    res.json({ accessToken: token });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

const profile = async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Authorization Failed" });

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    try {
      const user = await User.findById(userId);

      if (!user) return res.status(404).json({ error: "User not found" });
      return res.json(user);
    } catch (error) {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(401).json({ error: "Access Token is Expired, Please try to Login Again" });
  }
};

module.exports = {
  loginUser,
};

module.exports = {
  registerUser,
  loginUser,
  profile,
};
