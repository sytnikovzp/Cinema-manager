const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Director extends Model {
    static associate(models) {
      Director.belongsTo(models.Country, {
        foreignKey: 'countryId',
      });

      Director.belongsToMany(models.Movie, {
        through: models.MovieDirector,
        foreignKey: 'director_id',
      });
    }
  }
  Director.init(
    {
      full_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      country_id: DataTypes.INTEGER,
      birth_date: DataTypes.DATEONLY,
      death_date: DataTypes.DATEONLY,
      photo: DataTypes.TEXT,
      biography: DataTypes.TEXT,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
    },
    {
      sequelize,
      modelName: 'Director',
      tableName: 'directors',
      underscored: true,
    }
  );
  return Director;
};
