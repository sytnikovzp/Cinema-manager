'use strict';

const { locations } = require('../../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('locations', locations, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('locations', null, {});
  },
};
