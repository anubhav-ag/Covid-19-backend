'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {  
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: {
            tableName: 'users',
            //schema: 'appointment_booker'
          },
          key: 'id'
        }
      },
      slot_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        references: {
          model: {
            tableName: 'slots',
            //schema: 'appointment_booker'
          },
          key: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW

      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW

      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Appointments');
  }
};

