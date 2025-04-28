const userManagement = require('./userManagement');
const serviceManagement = require('./serviceManagement');

module.exports = {
  ...userManagement,
  ...serviceManagement
};
const adminService = require('./admin.service');

exports.getUsers = async (req, res) => {
  try {
    const users = await adminService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const updatedUser = await adminService.updateUserRole(id, role);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.suspendUser = async (req, res) => {
  try {
    const { id } = req.params;
    const suspendedUser = await adminService.suspendUser(id);
    res.json(suspendedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await adminService.deleteUser(id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.saveSettings = async (req, res) => {
  try {
    const settings = req.body;
    const savedSettings = await adminService.saveSettings(settings);
    res.json(savedSettings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const adminData = req.body;
    const newAdmin = await adminService.createAdmin(adminData);
    res.json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
