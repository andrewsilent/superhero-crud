'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('heroes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nickname: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      realName: {
        field: 'real_name',
        unique: true,
        type: Sequelize.STRING,
        allowNull: false,
      },
      originDescription: {
        field: 'origin_description',
        type: Sequelize.TEXT,
        allowNull: false,
      },
      catchPhrase: {
        field: 'catch_phrase',
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('heroes');
  },
};
