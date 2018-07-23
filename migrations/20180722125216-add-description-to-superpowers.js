'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('superpowers',
      'description', {
        type: Sequelize.STRING
      })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('superpowers',
      'description');
  }
};