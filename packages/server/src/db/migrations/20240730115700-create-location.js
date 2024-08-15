'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      country_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'countries',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      coat_of_arms: {
        type: Sequelize.TEXT,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('locations');
  },
};
