'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Appointments', 'slot_id', {  
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'slots',
            //schema: 'appointment_booker'
          },
          key: 'id'
        }
      })
  },
  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('Appointments', 'slot_id')

    ;
  }
};

