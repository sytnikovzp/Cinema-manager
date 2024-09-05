'use strict';

const { studios } = require('../../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('studios', studios, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('studios', null, {});
  },
};
