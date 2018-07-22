'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('oauth_tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      access_token: {
        allowNull: false,
        type: Sequelize.STRING
      },
      access_token_expires_on: {
        allowNull: false,
        type: Sequelize.DATE
      },
      refresh_token: {
        allowNull: false,
        type: Sequelize.STRING
      },
      refresh_token_expires_on: {
        allowNull: false,
        type: Sequelize.DATE
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
      },
      oauth_client_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'oauth_clients',
          key: 'id'
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('oauth_tokens')
  }
};