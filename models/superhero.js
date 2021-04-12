'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Superhero extends Model {
    static associate (models) {
      Superhero.hasMany(models.Image, {
        foreingKey: 'superheroId',
      });
      Superhero.belongsToMany(models.Superpower, {
        through: 'powers_to_heroes',
        foreingKey: 'superheroId',
      });
    }
  }
  Superhero.init(
    {
      nickname: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      realName: {
        type: DataTypes.STRING,
        field: 'real_name',
        unique: true,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      originDescription: {
        type: DataTypes.TEXT,
        field: 'origin_description',
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      catchPhrase: {
        type: DataTypes.STRING,
        field: 'catch_phrase',
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Superhero',
      tableName: 'heroes',
      underscored: true,
    },
  );
  return Superhero;
};
