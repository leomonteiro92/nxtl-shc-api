'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users-roles', {
      user_id: {
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id'
        },
        type: Sequelize.INTEGER,
      },
      role_id: {
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'roles',
          key: 'id'
        },
        type: Sequelize.INTEGER,
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users-roles')
  }
};