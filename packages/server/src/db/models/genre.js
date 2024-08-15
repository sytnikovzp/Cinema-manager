'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Genre.hasMany(models.Movie, {
        foreignKey: 'genreId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  }
  Genre.init(
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      logo: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Genre',
      tableName: 'genres',
      timestamps: false,
      underscored: true,
    }
  );
  return Genre;
};
