'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.Genre, { foreignKey: 'genreId' });

      Movie.belongsToMany(models.Actor, {
        through: models.MovieActor,
        foreignKey: 'movie_id',
      });

      Movie.belongsToMany(models.Director, {
        through: models.MovieDirector,
        foreignKey: 'movie_id',
      });

      Movie.belongsToMany(models.Studio, {
        through: models.MovieStudio,
        foreignKey: 'movie_id',
      });
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      genre_id: DataTypes.INTEGER,
      release_year: DataTypes.INTEGER,
      poster: DataTypes.TEXT,
      trailer: DataTypes.STRING,
      storyline: DataTypes.TEXT,
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
      modelName: 'Movie',
      tableName: 'movies',
      underscored: true,
    }
  );
  return Movie;
};