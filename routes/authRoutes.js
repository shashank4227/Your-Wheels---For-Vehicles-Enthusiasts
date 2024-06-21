const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../controller/UserController");
const session = require("express-session");

const router = express.Router();

// Alert message for frontend
const sendAlert = (res, redirectUrl, alertMessage) => {
  res.redirect(`${redirectUrl}?alert=true&message=${alertMessage}`);
};

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/accountDetails");
  }
  next();
};

router.get("/signup", (req, res) => {
  res.render("signup", {
    title: "Sign up",
    signupSuccess: req.query.signupSuccess,
    req: req,
  });
});

router.get("/login", isAuthenticated, (req, res) => {
  res.render("login", {
    title: "Log in",
    loginError: req.query.loginError,
    req: req,
    username: req.session.user ? req.session.user.username : null,
  });
});

router.get("/update", (req, res) => {
  res.render("update", {
    title: "Update",
    updateSuccess: req.query.updateSuccess,
    req: req,
    username: req.session.user ? req.session.user.username : null, // Ensure username is passed
  });
});

router.post(
  "/signup",
  [
    body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
    body("username").notEmpty().trim().escape().withMessage("Invalid username"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password must be at least 3 characters long"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendAlert(res, "/signup", errors.array()[0].msg);
    }

    const { username, email, password } = req.body;

    try {
      // Check if email already exists
      const existingEmail = await User.getUserByEmail(email); // Pass email as a string
      if (existingEmail) {
        return sendAlert(res, "/signup", "Email already exists");
      }

      // Check if username already exists
      const existingUser = await User.getUserByUsername(username); // Pass username as a string
      if (existingUser) {
        return sendAlert(res, "/signup", "Username already exists");
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user using User.createUser
      const newUser = await User.createUser(email, username, hashedPassword); // Pass email, username, and hashed password separately

      // Redirect with success message
      res.redirect("/login?signupSuccess=true");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.getUserByUsername(username);
    if (!user) {
      return sendAlert(res, "/login", "Invalid username");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendAlert(res, "/login", "Incorrect password");
    }
    req.session.user = user;
    res.redirect("/");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/update",
  [
    body("newUsername")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Invalid username"),
    body("newPassword")
      .isLength({ min: 3 })
      .withMessage("Password must be at least 3 characters long"),
    body("confirmNewPassword").custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("Password confirmation does not match new password");
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendAlert(res, "/update", errors.array()[0].msg);
    }

    const { newUsername, newPassword } = req.body;

    try {
      // Get the current user
      const currentUser = req.session.user;

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update the user's username and password
      const updatedUser = await User.updateUser(
        currentUser.username,
        newUsername,
        hashedPassword
      );

      req.session.user = updatedUser;

      // Redirect with success message
      res.redirect("/");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/logout", (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
    // Redirect to the login page after logout
    res.redirect("/");
  });
});

module.exports = router;
