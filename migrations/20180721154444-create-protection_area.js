'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.createTable('protection_areas', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
          unique: true
        },
        point: {
          allowNull: false,
          type: Sequelize.GEOMETRY('POINT', 4326)
        },
        radius: {
          allowNull: false,
          type: Sequelize.FLOAT
        },
        superhero_id: {
          allowNull: false,
          references: {
            model: 'superheroes',
            key: 'id'
          },
          type: Sequelize.INTEGER,
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
      await queryInterface.addConstraint('protection_areas', ['name'], {
        type: 'unique',
        name: 'unique_protection_areas_constraint_name'
      })
    ];
  },

  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.removeConstraint('protection_areas', 'unique_protection_areas_constraint_name', {}),
      await queryInterface.dropTable('protection_areas')
    ];
  }
};