const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieActor extends Model {
    static associate(models) {
      MovieActor.belongsTo(models.Movie, {
        foreignKey: 'movie_id',
      });

      MovieActor.belongsTo(models.Actor, {
        foreignKey: 'actor_id',
      });
    }
  }
  MovieActor.init(
    {
      movie_id: DataTypes.INTEGER,
      actor_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'MovieActor',
      tableName: 'movies_actors',
      timestamps: false,
      underscored: true,
    }
  );
  return MovieActor;
};
