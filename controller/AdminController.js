const Admin = require("../models/Admin");

class AdminController {
  static async createAdmin(adminUsername, adminPassword) {
    try {
      const newAdmin = new Admin({
        adminUsername: adminUsername,
        adminPassword: adminPassword,
      });
      await newAdmin.save();
      return newAdmin;
    } catch (error) {
      throw error;
    }
  }

  static async getAdminByUsername(adminUsername) {
    try {
      const admin = await Admin.findOne({ adminUsername: adminUsername });
      return admin;
    } catch (error) {
      throw error;
    }
  }

  static async updateAdmin(adminUsername, adminNewUsername, adminNewPassword) {
    try {
      const admin = await Admin.findOne({ adminUsername: adminUsername });
      if (!admin) {
        throw new Error("Admin not found");
      }

      // Update username and password
      admin.adminUsername = adminNewUsername;
      admin.adminPassword = adminNewPassword;

      await admin.save();

      return admin;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AdminController;
