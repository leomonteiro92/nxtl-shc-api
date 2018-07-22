'use strict';
const {randomBytes} = require('crypto');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('oauth_clients', [{
      uid: '566ac1527458cf9b',
      secret: 'f5e95dd9382fd5ae8b669de5d78a17bb',
      redirect_uri: '0.0.0.0',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('oauth_clients', null, {});
  }
};