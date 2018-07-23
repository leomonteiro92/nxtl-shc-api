'use strict';
const {
  hashSync
} = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      username: 'Administrator',
      password: hashSync('$@dmin$', 10),
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};