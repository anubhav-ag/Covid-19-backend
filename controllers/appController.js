require("dotenv").config();
const axios = require("axios");
const sequelize = require('../models/index')
const jwt = require("jsonwebtoken");
const Slots = require('../models/slot')
const Users = require('../models/user')
const Appointments = require('../models/appointment');
const clinics = require("../models/clinic");
const { DATE } = require("sequelize");
const SlotModel = Slots(sequelize.sequelize, sequelize.Sequelize.DataTypes)
const AppointmentModel = Appointments(sequelize.sequelize, sequelize.Sequelize.DataTypes)
const UserModel = Users(sequelize.sequelize, sequelize.Sequelize.DataTypes)
const StatefulContext  = require('stateful-context');
const { response } = require("express");
the = new StatefulContext()
set = the.set

//const _ = require("lodash");


const controllers = {
  //creating an appointment
  createAppointment: (req, res) => {
    const authToken = req.headers.auth_token
    const rawJWT = jwt.decode(authToken)
    const email = rawJWT.email
    let user_id_local
  
   return UserModel.findOne({
          where: {
            email: email }
          })
      .then ((emailresponse) => {
       // console.log(emailresponse + 'line34')
        if (!emailresponse) {
          res.status(400).json({ message: "no such user in database" })
          //return
          res.send
        }
        else 
        user_id_local=emailresponse.id
      })
        .then (() => {
          const appbody = req.body
          if (
            !appbody.clinic_id || !appbody.date || !appbody.time
          ) {
            res.status(400).json({ error: "field/selection must not be empty",
            });
            res.send
            //return;
          }
        })
          .then ((slotresponse) => {
           return SlotModel.findOne({
              //attribute: [id],
             where: {
             clinic_id: req.body.clinic_id,
             date: req.body.date,
             time_slot: req.body.time   
            }
          }
            )
           // console.log(slotresponse + 'line62')
          })
            .then ((apptResponse) => {
              //console.log(apptResponse + 'line 68')
              return isSlotAvail(apptResponse.id)
              .then((slotAvailability)=>{
                if (slotAvailability === true)
                {
                 // console.log("LINE 70")
                AppointmentModel.create({
                  //need to check if these exist in the DB already, create appt only if they dont exist
                    user_id: user_id_local,
                    slot_id: apptResponse.id
                    })
                }
              else{
                console.log("SOME ERROR")
              }
              })
             })
                .then ((confirmresponse) => {
                  res.status(200).json({ message: "successfully created appointment",
                  })
                })
                .catch((err) => {
                  console.log(err)
                })
            .catch((err) => {
              console.log(err)
            })
          .catch((err) => {
            console.log(err)
          })
        .catch((err) => {
          console.log(err)
        })
      .catch((err) => {
        console.log(err)
      })
      
  },
//get appointment for logged in user
  getAppointment: (req, res) => {
    //verify user at first
    const authToken = req.headers.auth_token
    const rawJWT = jwt.decode(authToken)
    const email = rawJWT.email
    let user_id_local
  
   return UserModel.findOne
    ({
      where: {email: email}
    })
      //for i user exists in DB
    .then ((emailresponse) => {
       if (!emailresponse) 
        {
          res.status(400).json({ message: "no such user in database" })
          res.send
        }
        else {
          res.status(200).json({message: "i will be getting the appt soon"})
          user_id_local = emailresponse.id
          //console.log("i am here inside get appt " + user_id_local)
        }
    })
      .then (() => {
        return AppointmentModel.findOne({
          where : {
            user_id:user_id_local,
          },
          //raw: true

        })
      })
        .then((apptResponse)=> {
          //console.log(apptResponse.slot_id + " this is line 142")
          return SlotModel.findOne({
            where : {
              id: apptResponse.slot_id
            },
            raw:true
          })
        })
        .then((slotResponse) => {
          //console.log(slotResponse.id + " this is line 151")
          if (!slotResponse) {
            res.status(400).json({ message: "no such user slot found" })
            res.send
          }
          else {
            res.status(200).json({ message: "slot is found", data:slotResponse })
          }
        })
              .catch((err) => {
                console.log(err)
              })
          .catch((err) => {
            console.log(err)
          })
        .catch((err) => {
          console.log(err)
        })
      .catch((err) => {
        console.log(err)
})
  },

  cancelAppointment: (req, res) => {
      //cancel appointment for user

    //verify user at first
    const authToken = req.headers.auth_token
    const rawJWT = jwt.decode(authToken)
    const email = rawJWT.email
    let user_id_local
  
   return UserModel.findOne
    ({
      where: {email: email}
    })
      //for i user exists in DB
    .then ((emailresponse) => {
       if (!emailresponse) 
        {
          res.status(400).json({ message: "no such user in database" })
          res.send
        }
        else {
          res.status(200).json({message: "i will be getting the appt soon"})
          user_id_local = emailresponse.id
          console.log("i am here inside get appt " + user_id_local)}
    })
      .then (() => {
        return AppointmentModel.destroy({
          where : {
            user_id:user_id_local
          }
        })
      })
  },

  updateAppointment: (req, res) => {
    //need to write function to define the user-login check
  },
} 
  
  module.exports = controllers

function isSlotAvail (local_slot_id) {
  return the.set ({
    numOfSlot : SlotModel.findOne({
      //num_of_slots,
      where : {
        id: local_slot_id
      }
    }),
    aggSlot: AppointmentModel.findAndCountAll ({
      where: {
        slot_id: local_slot_id}
  })
  })
  .then(function() {
    if (the.aggSlot.count != null && the.numOfSlot.num_of_slots != null){
    //console.log(the.aggSlot.count +" in isSlotAvailable "+ the.numOfSlot.num_of_slots)
    let return_val= (the.aggSlot.count < the.numOfSlot.num_of_slots)
    //console.log(return_val +" is return val")
    return return_val}
  })
  }