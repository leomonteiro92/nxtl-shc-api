'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.createTable('superheroes', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        alias: {
          allowNull: false,
          type: Sequelize.STRING
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }),
      await queryInterface.addConstraint('superheroes', ['name'], {
        type: 'unique',
        name: 'unique_superheroes_constraint_name'
      })
    ]
  },

  down: async (queryInterface) => {
    return [
      await queryInterface.removeConstraint('superheroes', 'unique_superheroes_constraint_name', {}),
      await queryInterface.dropTable('superheroes')
    ]
  }
};