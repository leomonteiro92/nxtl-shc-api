'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.createTable('oauth_clients', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        uid: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        secret: {
          allowNull: false,
          type: Sequelize.STRING
        },
        redirect_uri: Sequelize.STRING,
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }),
      await queryInterface.addConstraint('oauth_clients', ['uid'], {
        type: 'unique',
        name: 'unique_oauth_clients_constraint_uid'
      })
    ]
  },

  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.removeConstraint('oauth_clients', 'unique_oauth_clients_constraint_uid', {}),
      await queryInterface.dropTable('oauth_clients')
    ];
  }
};