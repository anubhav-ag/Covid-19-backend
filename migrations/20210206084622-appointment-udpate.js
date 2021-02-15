'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.removeColumn('Appointments', 'date')
      ]);
    },
  down: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.addColumn('Appointments', 'date', {
          type: Sequelize.DataTypes.DATE,
        })      
      
      ])
    }
  }

