const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting Seeding...');

  // 1. Create Users
  const users = await prisma.user.createMany({
    data: [
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        password: 'password123',
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com',
        password: 'securepass456',
      },
      {
        name: 'Charlie Brown',
        email: 'charlie@example.com',
        password: 'charlie789',
      },
      {
        name: 'Dana White',
        email: 'dana@example.com',
        password: 'danapass101',
      },
      {
        name: 'Ethan Black',
        email: 'ethan@example.com',
        password: 'ethanpass202',
      },
    ],
  });

  console.log('✅ Users created');

  // 2. Fetch users for relation IDs
  const allUsers = await prisma.user.findMany();

  // 3. Create Services (linked to users)
  await prisma.service.createMany({
    data: [
      {
        title: 'Website Development',
        description: 'Building responsive websites',
        price: 2500.0,
        category: 'Web Development',
        userId: allUsers[0].id,
      },
      {
        title: 'Logo Design',
        description: 'Professional logo creation',
        price: 800.0,
        category: 'Design',
        userId: allUsers[1].id,
      },
      {
        title: 'Digital Marketing',
        description: 'Social media management',
        price: 1500.0,
        category: 'Marketing',
        userId: allUsers[2].id,
      },
      {
        title: 'App Development',
        description: 'Cross-platform mobile apps',
        price: 5000.0,
        category: 'App Development',
        userId: allUsers[3].id,
      },
      {
        title: 'SEO Optimization',
        description: 'Boost your Google rankings',
        price: 1200.0,
        category: 'SEO',
        userId: allUsers[4].id,
      },
    ],
  });

  console.log('✅ Services created');

  // 4. Create Rewards
  await prisma.reward.createMany({
    data: [
      {
        title: 'Bronze Member',
        description: 'Awarded for reaching 100 points',
        pointsCost: 100,
      },
      {
        title: 'Silver Member',
        description: 'Awarded for reaching 500 points',
        pointsCost: 500,
      },
      {
        title: 'Gold Member',
        description: 'Awarded for reaching 1000 points',
        pointsCost: 1000,
      },
    ],
  });

  console.log('✅ Rewards created');

  // 5. Create Tasks (optional)
  await prisma.task.createMany({
    data: [
      {
        title: 'Complete profile setup',
        description: 'Fill in your bio and skills',
        userId: allUsers[0].id,
      },
      {
        title: 'Verify email address',
        description: 'Confirm your email address',
        userId: allUsers[1].id,
      },
    ],
  });

  console.log('✅ Tasks created');

  // 6. Create Notifications
  await prisma.notification.createMany({
    data: [
      {
        title: 'Welcome!',
        message: 'Thanks for joining the platform.',
        userId: allUsers[0].id,
      },
      {
        title: 'Profile Tip',
        message: 'Complete your profile for better matches.',
        userId: allUsers[1].id,
      },
    ],
  });

  console.log('✅ Notifications created');

  console.log('🎉 Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
