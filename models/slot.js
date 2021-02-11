'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Slot.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT.UNSIGNED
    },
    date: {
      type: DataTypes.DATEONLY
    },

    time_slot: {
      type: DataTypes.STRING,
      unique: true
    },
    num_of_slots: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 10
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    clinic_id: { 
      type: DataTypes.INTEGER,
      references: {
        // This is a reference to another model
        model: 'Clinic',
    
        // This is the column name of the referenced model
        key: 'id'
      }
    }  
  }, {
    sequelize,
    modelName: 'Slot',
    underscored: true

  });
  return Slot;
};


