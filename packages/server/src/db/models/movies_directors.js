'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieDirector extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MovieDirector.belongsTo(models.Movie, { foreignKey: 'movie_id' });
      MovieDirector.belongsTo(models.Director, { foreignKey: 'director_id' });
    }
  }
  MovieDirector.init(
    {
      movie_id: DataTypes.INTEGER,
      director_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'MovieDirector',
      tableName: 'movies_directors',
      timestamps: false,
      underscored: true,
    }
  );
  return MovieDirector;
};
