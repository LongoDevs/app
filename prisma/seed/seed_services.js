const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async function () {
  const users = await prisma.user.findMany();

  if (!users.length) {
    console.warn(' No users found, skipping services seeding.');
    return;
  }

  await prisma.service.createMany({
    data: [
      {
        title: 'Logo Design',
        description: 'Professional logo design for your brand.',
        price: 750.0,
        category: 'Design',
        userId: users[0].id,
      },
      {
        title: 'Website Development',
        description: 'Get your website built using modern tools.',
        price: 2500.0,
        category: 'Web Development',
        userId: users[1].id,
      },
    ],
  });

  console.log(' Services seeded!');
};



