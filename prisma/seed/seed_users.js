const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async function () {
  await prisma.user.createMany({
    data: [
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        password: 'password123', // You can hash this later
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com',
        password: 'securepass456',
      },
    ],
  });

  console.log(' Users seeded!');
};
