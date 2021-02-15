"use strict";
const Slots = require("../models/slot");
const SlotModel = Slots(sequelize.sequelize, sequelize.Sequelize.DataTypes);

const sequelize = require("../models/index");

let date = slot.date;

let slotArray = [
  "9:00am",
  "9:30am",
  "10:00am",
  "10:30am",
  "11:00am",
  "11:30am",
  "1:0pam",
  "1:30pm",
  "2:00pm",
  "2:30pm",
  "3:00pm",
  "3:30pm",
  "4:00pm",
  "4:30pm",
];
let clinicArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let dateArray = [
  Date.now(),
  Date.now() + 1,
  Date.now() + 2,
  Date.now() + 3,
  Date.now() + 4,
];

module.exports = {
  createSlot() {
    function addTimeAndClinicID() {
      for (let k = 0; k < this.slotArray.length; k++) {
        for (let j = 0; j < this.clinicArray.length; j++) {
          (time_slot = this.slotArray[k]), (clinic_id = this.clinicArray[j]);
          return time_slot, clinic_id;
        }
        for (let i = 0; i < dateArray.length; i++) {
          (SlotModel.date = dateArray[i]),
            (slot.num_of_Slots = 10),
            (created_at = Sequelize.fn("NOW")),
            (updated_at = Sequelize.fn("NOW"));
          return date, num_of_Slots, created_at, updated_at;
        }
      }
    }
  },
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Slots", createSlot());
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Slots", null, {});
  },
};
