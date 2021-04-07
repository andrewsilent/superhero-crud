'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Superpower extends Model {
    static associate (models) {
      Superpower.belongsToMany(models.Superhero, {
        through: 'powers_to_heroes',
        foreingKey: 'powerId',
      });
    }
  }
  Superpower.init(
    {
      superpower: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Superpower',
      tableName: 'hero_powers',
      underscored: true,
    },
  );
  return Superpower;
};
