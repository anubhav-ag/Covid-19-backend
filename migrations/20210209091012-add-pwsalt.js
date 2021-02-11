'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.addColumn('Users', 'pwsalt', {
          type: Sequelize.DataTypes.STRING,
        })
      ]);
    },
  down: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'pwsalt')
      ])
    }
  }

