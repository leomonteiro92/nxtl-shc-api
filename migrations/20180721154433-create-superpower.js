'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.createTable('superpowers', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
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
      await queryInterface.addConstraint('superpowers', ['name'], {
        type: 'unique',
        name: 'unique_superpowers_constraint_name'
      })
    ]
  },

  down: async (queryInterface) => {
    return [
      await queryInterface.removeConstraint('superpowers', constraint_name, {}),
      await queryInterface.dropTable('superpowers')
    ]
  }
};