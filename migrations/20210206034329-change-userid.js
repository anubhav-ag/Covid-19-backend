'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>  {
    await queryInterface.removeColumn('Users', 'user_id', {  
        type: Sequelize.STRING
      })
  },
  up: async (queryInterface, Sequelize) =>  {
    await queryInterface.removeColumn('Users', 'cellphone', {  
        type: Sequelize.TEXT
      })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'user_id'),
    await queryInterface.removeColumn('Users', 'cellphone')

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
