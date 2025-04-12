const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedServices() {
  await prisma.service.createMany({
    data: [
      {
        title: 'Garden Cleaning',
        description: 'Professional gardening and landscaping',
        price: 500.0,
        userId: 1,
      },
      {
        title: 'Private Math Tutor',
        description: 'High school math tutoring',
        price: 300.0,
        userId: 2,
      },
    ],
  });
}

seedServices()
  .then(() => {
    console.log('Services seeded.');
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
