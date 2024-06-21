const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Employee = require("../controller/EmployeeController");
const session = require("express-session");

const router = express.Router();

const sendAlert = (res, redirectUrl, alertMessage) => {
  res.redirect(`${redirectUrl}?alert=true&message=${alertMessage}`);
};

const isAuthenticated = (req, res, next) => {
  if (!req.session.employee) {
    return res.redirect("/employeePage");
  }
  next();
};

router.get("/employee-signup", (req, res) => {
  res.render("employeeSignup", {
    title: "Sign up",
    signupSuccess: req.query.signupSuccess,
    req: req,
  });
});

router.get("/employee-login", isAuthenticated, (req, res) => {
  res.render("employeeLogin", {
    title: "Log in",
    loginError: req.query.loginError,
    req: req,
    employeeUsername: req.session.employee
      ? req.session.employee.employeeUsername
      : null,
  });
});

router.get("/employee-update", (req, res) => {
  res.render("employeeUpdate", {
    title: "Update",
    updateSuccess: req.query.updateSuccess,
    req: req,
    employeesername: req.session.employee
      ? req.session.employee.employeeUsername
      : null,
  });
});

router.post(
  "/employee-signup",
  [
    body("employeeUsername")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Invalid employeeUsername"),
    body("employeePassword")
      .isLength({ min: 3 })
      .withMessage("employeePassword must be at least 3 characters long"),
    body("confirmEmployeePassword").custom((value, { req }) => {
      if (value !== req.body.employeePassword) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendAlert(res, "/employee-signup", errors.array()[0].msg);
    }

    const { employeeUsername, employeePassword } = req.body;

    try {
      const existingEmployee = await Employee.getEmployeeByUsername(
        employeeUsername
      );
      if (existingEmployee) {
        return sendAlert(res, "/employee-signup", "Username already exists");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedEmployeePassword = await bcrypt.hash(employeePassword, salt);

      const newEmployee = await Employee.createEmployee(
        employeeUsername,
        hashedEmployeePassword
      );

      res.redirect("/employeeLogin?signupSuccess=true");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.post("/employee-login", async (req, res) => {
  const { employeeUsername, employeePassword } = req.body;
  try {
    const employee = await Employee.getEmployeeByUsername(employeeUsername);
    if (!employee) {
      return sendAlert(res, "/employee-login", "Invalid employeeUsername");
    }
    const isMatch = await bcrypt.compare(
      employeePassword,
      employee.employeePassword
    );
    if (!isMatch) {
      return sendAlert(res, "/employee-login", "Incorrect password");
    }
    req.session.employee = employee;
    res.redirect("/employeePageUsers");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/employee-update",
  [
    body("employeeNewUsername")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Invalid employeeUsername"),
    body("employeeNewPassword")
      .isLength({ min: 3 })
      .withMessage("Password must be at least 3 characters long"),
    body("confirmEmployeeNewPassword").custom((value, { req }) => {
      if (value !== req.body.employeeNewPassword) {
        throw new Error("Password confirmation does not match new password");
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendAlert(res, "/employee-update", errors.array()[0].msg);
    }

    const { employeeNewUsername, employeeNewPassword } = req.body;

    try {
      const currentEmployee = req.session.employee;

      const salt = await bcrypt.genSalt(10);
      const hashedEmployeePassword = await bcrypt.hash(
        employeeNewPassword,
        salt
      );

      const updatedEmployee = await Employee.updateEmployee(
        currentEmployee.employeeUsername,
        employeeNewUsername,
        hashedEmployeePassword
      );

      req.session.employee = updatedEmployee;

      res.redirect("/employeePage");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/employee-logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
    res.redirect("/employeeLogin");
  });
});

module.exports = router;
