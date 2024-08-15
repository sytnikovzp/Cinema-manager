'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Studio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Studio.belongsTo(models.Location, { foreignKey: 'locationId' });
      
      Studio.belongsToMany(models.Movie, {
        through: models.MovieStudio,
        foreignKey: 'studio_id',
      });
    }
  }
  Studio.init(
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      location_id: DataTypes.INTEGER,
      foundation_year: DataTypes.INTEGER,
      logo: DataTypes.TEXT,
      about: DataTypes.TEXT,
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
      modelName: 'Studio',
      tableName: 'studios',
      underscored: true,
    }
  );
  return Studio;
};
