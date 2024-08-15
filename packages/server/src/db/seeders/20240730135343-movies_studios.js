'use strict';

const { movies_studios } = require('../../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('movies_studios', movies_studios, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('movies_studios', null, {});
  },
};
