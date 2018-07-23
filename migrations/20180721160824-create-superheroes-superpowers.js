'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('superheroes-superpowers', {
      superhero_id: {
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'superheroes',
          key: 'id'
        },
        type: Sequelize.INTEGER,
      },
      superpower_id: {
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'superpowers',
          key: 'id'
        },
        type: Sequelize.INTEGER,
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('superheroes-superpowers')
  }
};