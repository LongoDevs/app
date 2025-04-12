// seeders/service.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Services', [
      {
        title: 'Lawn Mowing',
        description: 'Professional lawn mowing services to keep your garden tidy.',
        category: 'Gardening',
        price: 50.00,
        userId: 1, // Refers to the user with ID 1 (John Doe)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Private Tutoring',
        description: 'Math and Science tutoring for high school students.',
        category: 'Tutoring',
        price: 30.00,
        userId: 2, // Refers to the user with ID 2 (Jane Smith)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Home Cleaning',
        description: 'Full house cleaning service, including dusting, vacuuming, and more.',
        category: 'Cleaning',
        price: 75.00,
        userId: 3, // Refers to the user with ID 3 (Alice Johnson)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Services', null, {});
  }
};
