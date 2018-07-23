'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('protection_areas', [{
        name: 'Memorial da America Latina',
        point: queryInterface.sequelize.fn('ST_GeomFromText', 'POINT(-46.664291 -23.526770)', '4326'),
        radius: 10.0,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        name: 'Ibirapuera Park',
        point: queryInterface.sequelize.fn('ST_GeomFromText', 'POINT(-46.660683 -23.601852)', '4326'),
        radius: 10.0,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Aclimacao Park',
        point: queryInterface.sequelize.fn('ST_GeomFromText', 'POINT(-46.6310489 -23.5725577)', '4326'),
        radius: 10.0,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        name: 'Estaiada Bridge',
        point: queryInterface.sequelize.fn('ST_GeomFromText', 'POINT(-46.6994637 -23.6133603)', '4326'),
        radius: 10.0,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        name: 'Mercado Municipal de Sao Paulo',
        point: queryInterface.sequelize.fn('ST_GeomFromText', 'POINT(-46.6318314 -23.5423521)', '4326'),
        radius: 10.0,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        name: 'Morumbi Stadium',
        point: queryInterface.sequelize.fn('ST_GeomFromText', 'POINT(-46.72228423 -23.6000839)', '4326'),
        radius: 10.0,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        name: 'Arena Corinthians',
        point: queryInterface.sequelize.fn('ST_GeomFromText', 'POINT(-46.4764616 -23.5453172)', '4326'),
        radius: 10.0,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        name: 'Allianz Park',
        point: queryInterface.sequelize.fn('ST_GeomFromText', 'POINT(-46.6807346 -23.527446)', '4326'),
        radius: 10.0,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        name: 'Museum of Art of São Paulo Assis Chateaubriand',
        point: queryInterface.sequelize.fn('ST_GeomFromText', 'POINT(-46.6580759 -23.5614091)', '4326'),
        radius: 10.0,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        name: 'Beco do Batman',
        point: queryInterface.sequelize.fn('ST_GeomFromText', 'POINT(-46.6888377 -23.5565311)', '4326'),
        radius: 10.0,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        name: 'Praca da Republica',
        point: queryInterface.sequelize.fn('ST_GeomFromText', 'POINT(-46.644694 -23.5440801)', '4326'),
        radius: 10.0,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('protection_areas', null, {});
  }
};