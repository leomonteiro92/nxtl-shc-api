'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.removeColumn('protection_areas', 'superhero_id'),
      await queryInterface.addColumn('superheroes', 'protection_area_id', {
        allowNull: false,
        references: {
          model: 'protection_areas',
          key: 'id'
        },
        type: Sequelize.INTEGER
      })
    ];
  },

  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.removeColumn('superheroes', 'protection_area_id'),
      await queryInterface.addColumn('protection_areas', 'superhero_id', {
        allowNull: false,
        references: {
          model: 'superheroes',
          key: 'id'
        },
        type: Sequelize.INTEGER
      })
    ];



  }
};