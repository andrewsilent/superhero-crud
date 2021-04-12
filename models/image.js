'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate (models) {
      Image.belongsTo(models.Superhero, {
        foreingKey: 'superheroId',
      });
    }
  }
  Image.init(
    {
      imagePath: {
        type: DataTypes.TEXT,
        field: 'image_path',
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Image',
      tableName: 'hero_images',
      underscored: true,
    },
  );
  return Image;
};
