const Employee = require("../models/Employee");

class EmployeeController {
  static async createEmployee(employeeUsername, employeePassword) {
    try {
      const newEmployee = new Employee({
        employeeUsername: employeeUsername,
        employeePassword: employeePassword,
      });
      await newEmployee.save();
      return newEmployee;
    } catch (error) {
      throw error;
    }
  }

  static async getEmployeeByUsername(employeeUsername) {
    try {
      const employee = await Employee.findOne({
        employeeUsername: employeeUsername,
      });
      return employee;
    } catch (error) {
      throw error;
    }
  }

  static async updateEmployee(
    employeeUsername,
    employeeNewUsername,
    employeeNewPassword
  ) {
    try {
      const employee = await Employee.findOne({
        employeeUsername: employeeUsername,
      });
      if (!employee) {
        throw new Error("Employee not found");
      }

      // Update username and password
      employee.employeeUsername = employeeNewUsername;
      employee.employeePassword = employeeNewPassword;

      await employee.save();

      return employee;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = EmployeeController;
