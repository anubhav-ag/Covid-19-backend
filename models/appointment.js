"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Appointment.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: {
            tableName: "users",
            //schema: 'appointment_booker'
          },
          key: "id",
        },
      },
      slot_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        references: {
          model: {
            tableName: "slots",
            //schema: 'appointment_booker'
          },
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Appointment",
      underscored: true,
      /*classMethods: {
      associate: function(models) {
        models.Appointment.belongsTo(models.Slot, { foreignKey: 'slot_id' })
      }
    }*/
    }
  );
  return Appointment;
};