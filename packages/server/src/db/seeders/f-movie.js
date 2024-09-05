'use strict';

const { movies } = require('../../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('movies', movies, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('movies', null, {});
  },
};
