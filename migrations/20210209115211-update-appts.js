'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.addColumn('Appointments', 'created_at', {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        }),
        queryInterface.addColumn('Appointments', 'updated_at', {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        })
      ]);
    },
  down: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.removeColumn('Appointments', 'created_at'),
        queryInterface.removeColumn('Appointments', 'updated_at'),
      ])
    }
  }
