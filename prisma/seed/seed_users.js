const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedUsers() {
  await prisma.user.createMany({
    data: [
      {
        name: 'Alice',
        email: 'alice@example.com',
        password: 'hashedpassword123',
      },
      {
        name: 'Bob',
        email: 'bob@example.com',
        password: 'hashedpassword456',
      },
    ],
  });
}

seedUsers()
  .then(() => {
    console.log('Users seeded.');
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
