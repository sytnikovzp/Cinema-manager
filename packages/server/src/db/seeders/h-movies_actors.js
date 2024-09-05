'use strict';

const { movies_actors } = require('../../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('movies_actors', movies_actors, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('movies_actors', null, {});
  },
};
