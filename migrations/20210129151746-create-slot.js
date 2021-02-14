'use strict';
//const clinic = require('./models/clinic.js') 
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Slots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED
      },
      date: {
        type: Sequelize.DATEONLY
      },
      time_slot: {
        type: Sequelize.STRING,
        unique: true
      },
      num_of_slots: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 10
      },
      clinic_id: { 
        type: Sequelize.INTEGER.UNSIGNED,
        unique: true,
        references: {
          model: {
            tableName: 'clinics',
            //schema: 'appointment_booker'
          },
          key: 'id'
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Slots');
  }
};