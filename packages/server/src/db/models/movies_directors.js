const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieDirector extends Model {
    static associate(models) {
      MovieDirector.belongsTo(models.Movie, {
        foreignKey: 'movie_id',
      });

      MovieDirector.belongsTo(models.Director, {
        foreignKey: 'director_id',
      });
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
