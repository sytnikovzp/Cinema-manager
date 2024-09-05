'use strict';

const { movies_directors } = require('../../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('movies_directors', movies_directors, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('movies_directors', null, {});
  },
};
