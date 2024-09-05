'use strict';

const { directors } = require('../../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('directors', directors, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('directors', null, {});
  },
};
