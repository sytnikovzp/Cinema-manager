'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieStudio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MovieStudio.belongsTo(models.Movie, { foreignKey: 'movie_id' });
      MovieStudio.belongsTo(models.Studio, { foreignKey: 'studio_id' });
    }
  }
  MovieStudio.init(
    {
      movie_id: DataTypes.INTEGER,
      studio_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'MovieStudio',
      tableName: 'movies_studios',
      timestamps: false,
      underscored: true,
    }
  );
  return MovieStudio;
};
