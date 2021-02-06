'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'user_id'),
        queryInterface.addColumn('Users', 'cellphone', {
          type: Sequelize.DataTypes.STRING,
        })
      ]);
    },
  down: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.addColumn('Users', 'user_id', {
          type: Sequelize.DataTypes.STRING,
        }),
        queryInterface.removeColumn('Users', 'cellphone')
      ])
    }
  }