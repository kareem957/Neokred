require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const { loginSchema, registerSchema } = require("./validation/userValidation");
const userController = require("./controller/userController");

const app = express();

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

// Register a new user with validation using the controller
app.post(
  "/register",
  (req, res, next) => {
    const validationResult = registerSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details[0].message });
    }
    next();
  },
  userController.registerUser
);

// Login using the controller
app.post(
  "/login",
  (req, res, next) => {
    const validationResult = loginSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details[0].message });
    }
    next();
  },
  userController.loginUser
);

// Profile API with JWT token validation
app.get("/profile", userController.profile);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
