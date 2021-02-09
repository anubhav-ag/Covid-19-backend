'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.addColumn('Slots', 'created_at', {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        }),
        queryInterface.addColumn('Slots', 'updated_at', {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        })
      ]);
    },
  down: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.removeColumn('Slots', 'created_at'),
        queryInterface.removeColumn('Slots', 'updated_at'),
      ])
    }
  }
