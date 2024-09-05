'use strict';

const { actors } = require('../../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('actors', actors, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('actors', null, {});
  },
};
