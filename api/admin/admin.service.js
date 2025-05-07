const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getUsers = async () => {
  return prisma.user.findMany();
};

exports.updateUserRole = async (id, role) => {
  return prisma.user.update({
    where: { id },
    data: { role }
  });
};

exports.suspendUser = async (id) => {
  return prisma.user.update({
    where: { id },
    data: { active: false }
  });
};

exports.deleteUser = async (id) => {
  return prisma.user.delete({
    where: { id }
  });
};

exports.saveSettings = async (settings) => {
  return prisma.settings.upsert({
    where: { id: 1 },
    update: { ...settings },
    create: { id: 1, ...settings },
  });
};

exports.createAdmin = async (adminData) => {

  return prisma.user.create({
    data: {
      name: adminData.name,
      email: adminData.email,
      password: hashedPassword,
      role: adminData.role || 'admin',
    }
  });
};
