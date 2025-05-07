// import express from 'express';
// import { prisma } from '../../prisma/client';

// const router = express.Router();

// // Update Profile
// router.post('/update-profile', async (req, res) => {
//   const { adminId, name, email } = req.body;
//   try {
//     await prisma.admin.update({
//       where: { id: adminId },
//       data: { name, email },
//     });
//     res.json({ message: 'Profile updated.' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Change Password
// router.post('/change-password', async (req, res) => {
//   const { adminId, oldPassword, newPassword } = req.body;
//   try {
//     const admin = await prisma.admin.findUnique({ where: { id: adminId } });
//     const match = await pt.compare(oldPassword, admin.password);

//     if (!match) return res.status(400).json({ error: 'Old password incorrect' });

//     const hashed = await bcrypt.hash(newPassword, 10);
//     await prisma.admin.update({
//       where: { id: adminId },
//       data: { password: hashed },
//     });

//     res.json({ message: 'Password changed successfully.' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Update Preferences
// router.post('/update-preferences', async (req, res) => {
//   const { adminId, preferences } = req.body;
//   try {
//     await prisma.admin.update({
//       where: { id: adminId },
//       data: { permissions: preferences },
//     });
//     res.json({ message: 'Preferences updated.' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Create Minor Admin
// router.post('/admins/create', async (req, res) => {
//   const { name, email, password, permissions } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await prisma.admin.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//         role: 'admin',
//         permissions,
//       },
//     });
//     res.json({ message: 'Admin created.' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Update Admin Access
// router.post('/admins/update-access', async (req, res) => {
//   const { adminId, permissions } = req.body;
//   try {
//     await prisma.admin.update({
//       where: { id: adminId },
//       data: { permissions },
//     });
//     res.json({ message: 'Permissions updated.' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // List Admins
// router.get('/admins/list', async (req, res) => {
//   try {
//     const admins = await prisma.admin.findMany({
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         role: true,
//         permissions: true,
//         createdAt: true,
//       },
//     });
//     res.json({ data: admins });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Delete Admin
// router.delete('/admins/:adminId', async (req, res) => {
//   try {
//     const { adminId } = req.params;
//     await prisma.admin.delete({ where: { id: adminId } });
//     res.json({ message: 'Admin deleted.' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;
