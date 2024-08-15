'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Location.belongsTo(models.Country, { foreignKey: 'countryId' });

      Location.hasMany(models.Studio, {
        foreignKey: 'locationId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  }
  Location.init(
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      country_id: DataTypes.INTEGER,
      coat_of_arms: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Location',
      tableName: 'locations',
      timestamps: false,
      underscored: true,
    }
  );
  return Location;
};
