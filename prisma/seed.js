async function main() {
  try {
    console.log(' Seeding users...');
    await require('./seed/seed_users')();

    console.log(' Seeding services...');
    await require('./seed/seed_services')();

    console.log(' Seeding completed!');
  } catch (error) {
    console.error(' Seeding failed:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

main();




