'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('projects', [{
        title: 'Personal Web',
        start_date: new Date("2023-9-25"),
        end_date: new Date("2023-10-23"),
        description: 'Tugas Dumbways batch 50 stage 1',
        technologies: ["node-js"],
        image: 'img.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('People', null, {});
    
  }
};
