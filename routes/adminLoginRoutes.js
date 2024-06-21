const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Admin = require("../controller/AdminController");
const session = require("express-session");

const router = express.Router();

const sendAlert = (res, redirectUrl, alertMessage) => {
  res.redirect(`${redirectUrl}?alert=true&message=${alertMessage}`);
};

const isAuthenticated = (req, res, next) => {
  if (!req.session.admin) {
    return res.redirect("/adminPage");
  }
  next();
};

router.get("/admin-signup", (req, res) => {
  res.render("adminSignup", {
    title: "Sign up",
    signupSuccess: req.query.signupSuccess,
    req: req,
  });
});

router.get("/admin-login", isAuthenticated, (req, res) => {
  res.render("adminLogin", {
    title: "Log in",
    loginError: req.query.loginError,
    req: req,
    adminUsername: req.session.admin ? req.session.admin.adminUsername : null,
  });
});

router.get("/admin-update", (req, res) => {
  res.render("adminUpdate", {
    title: "Update",
    updateSuccess: req.query.updateSuccess,
    req: req,
    adminUsername: req.session.admin ? req.session.admin.adminUsername : null,
  });
});

router.post(
  "/admin-signup",
  [
    body("adminUsername")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Invalid adminUsername"),
    body("adminPassword")
      .isLength({ min: 3 })
      .withMessage("adminPassword must be at least 3 characters long"),
    body("confirmAdminPassword").custom((value, { req }) => {
      if (value !== req.body.adminPassword) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendAlert(res, "/admin-signup", errors.array()[0].msg);
    }

    const { adminUsername, adminPassword } = req.body;

    try {
      const existingAdmin = await Admin.getAdminByUsername(adminUsername);
      if (existingAdmin) {
        return sendAlert(res, "/admin-signup", "Username already exists");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedAdminPassword = await bcrypt.hash(adminPassword, salt);

      const newAdmin = await Admin.createAdmin(
        adminUsername,
        hashedAdminPassword
      );

      res.redirect("/adminLogin?signupSuccess=true");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.post("/admin-login", async (req, res) => {
  const { adminUsername, adminPassword } = req.body;
  try {
    const admin = await Admin.getAdminByUsername(adminUsername);
    if (!admin) {
      return sendAlert(res, "/admin-login", "Invalid adminUsername");
    }
    const isMatch = await bcrypt.compare(adminPassword, admin.adminPassword);
    if (!isMatch) {
      return sendAlert(res, "/admin-login", "Incorrect password");
    }
    req.session.admin = admin;
    res.redirect("/adminPageUsers");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/admin-update",
  [
    body("adminNewUsername")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Invalid adminUsername"),
    body("adminNewPassword")
      .isLength({ min: 3 })
      .withMessage("Password must be at least 3 characters long"),
    body("confirmAdminNewPassword").custom((value, { req }) => {
      if (value !== req.body.adminNewPassword) {
        throw new Error("Password confirmation does not match new password");
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendAlert(res, "/admin-update", errors.array()[0].msg);
    }

    const { adminNewUsername, adminNewPassword } = req.body;

    try {
      const currentAdmin = req.session.admin;

      const salt = await bcrypt.genSalt(10);
      const hashedAdminPassword = await bcrypt.hash(adminNewPassword, salt);

      const updatedAdmin = await Admin.updateAdmin(
        currentAdmin.adminUsername,
        adminNewUsername,
        hashedAdminPassword
      );

      req.session.admin = updatedAdmin;

      res.redirect("/adminPage");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/admin-logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
    res.redirect("/adminLogin");
  });
});

module.exports = router;
