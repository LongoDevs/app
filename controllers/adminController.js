const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

const registerAdmin = async (req, res) => {
  const { username, email, password, type, profilePic } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await prisma.admin.create({
      data: {
        username,
        email,
        password: hashedPassword,
        type,
        profilePic,
      },
    });
    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Error creating admin', error });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) return res.status(401).json({ message: 'Invalid email' });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, admin });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

const getAdminProfile = async (req, res) => {
  try {
    const admin = await prisma.admin.findUnique({ where: { id: req.user.id } });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};

module.exports = { registerAdmin, loginAdmin, getAdminProfile };
