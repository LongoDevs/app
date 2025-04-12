async function main() {
  await require('./seed/seed_users')();
  await require('./seed/seed_services')();
}

main();
