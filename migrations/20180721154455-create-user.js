'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.createTable('users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING
        },
        username: {
          allowNull: false,
          type: Sequelize.STRING,
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
      await queryInterface.addConstraint('users', ['username'], {
        type: 'unique',
        name: 'unique_users_constraint_username'
      })
    ];
  },

  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.removeConstraint('users', 'unique_users_constraint_username', {}),
      await queryInterface.dropTable('users')
    ];
  }
};