require("dotenv").config();
const axios = require("axios");
const sequelize = require('../models/index')
const jwt = require("jsonwebtoken");
const SHA256 = require("crypto-js/sha256");
const uuid = require("uuid");
const Slots = require('../models/slot')
const Users = require('../models/user')
const Appointments = require('../models/appointment');
const clinic = require("../models/clinic");
const { DATE } = require("sequelize");
const SlotModel = Slots(sequelize.sequelize, sequelize.Sequelize.DataTypes)
const AppointmentModel = Appointments(sequelize.sequelize, sequelize.Sequelize.DataTypes)
const UserModel = Users(sequelize.sequelize, sequelize.Sequelize.DataTypes)
const StatefulContext  = require('stateful-context')
the = new StatefulContext()
set = the.set

//const {UniqueConstraintError} = require ('sequelize/ types')

//const _ = require("lodash");

//creating an appointment

const controllers ={
  createAppointment: (req, res) => {

    const authToken = req.headers.auth_token
    const rawJWT = jwt.decode(authToken)
    const email = rawJWT.email
  
    UserModel.findOne({
          where: {
            email: email }
          })
      .then ((emailresponse) => {
       // console.log(emailresponse + 'line34')
        if (!emailresponse) {
          res.status(400).json({ message: "no such user in database" })
          //return
          res.send
        }})
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
            SlotModel.findOne({
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
            .then ((apptresponse) => {
              console.log(apptresponse + 'line 68')
              if (isSlotAvail(20) == true)
              {
                console.log("LINE 70")
              AppointmentModel.create({
                  user_id: 19,
                  slot_id: 20
                  })
              }
            else{
            
              console.log("SOME ERROR")
            }})
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
      
  }
}
  
  module.exports = controllers

  

/*
function getUserDetails(req, res) {
    //decode the jwt to retrieve the user iinfo
    const authToken = req.headers.auth_token;
    const rawJWT = jwt.decode(authToken);
    const email = rawJWT.email;
  
    //check the user databsase to see if the user exists using the above user info
  
    return UserModel.findOne({
      email: email
    });
  }
  
*/

/*
code for booking appt

1. check user

2. check options chosen in slot table
clinic - check for id
date - chedk date
time - check time

3. add slot_id and user id to reservation table

*/
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
        slot_id: local_slot_id      }
  })
  })
  .then(function() {
    console.log(the.aggSlot.count +" in isSlotAvailable "+ the.numOfSlot.num_of_slots)
    let return_val= (the.aggSlot.count <the.numOfSlot.num_of_slots)
    console.log(return_val +" is return val")
    return return_val
  })
   
  }


  
  //write a function to reduce the num of slots in the slot table - 
  //create function to check aggreate of slot model to num of slots 
  
  
    /*
    allAppointments(req, res) {
    // Returns all appointments
    AppointmentModel.findAll({}).exec((err, appointments) => 
      res.json(appointments))
  },
    createAppointment: (req,res) => {
        console.log(req.body)
            
    AppointmentModel.create({
        clinic: req.body.clinic,
        date: req.body.date,
        time: req.body.time,
    })
        .then(response => {
            return res.status(201).json({
                success: true,
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(400).json({
                success: false,
                message: 'create appointment failed'
            })
        })
    }*/

    /*
  createAppointment: (req, res) => {
    const appbody = req.body;
    if (
      !appbody.clinic || !appbody.date || !appbody.time
    ) {
      res.json({
        error: "field/selection must not be empty",
      });
      return;
    }
    
    const authToken = req.headers.auth_token;
    const rawJWT = jwt.decode(authToken);
    const email = rawJWT.email;

    UserModel.findOne({
        email: email,
      }
      .then((emailresponse) => {
        if (!emailresponse) {
          res.json({ message: "no such user in database" })
          return
        }})
          .then((response) => {
            
            })
            .then((response) => {
            AppointmentModel
              .create({
                user_id: response.user_id,
                //clinic: response.clinic //selection,
                date: response.date,
                time: response.time
              })
            })
              .then((orderResponse) => {
                res.json({
                  message: "successfully created appointment",
                });
              })
              .catch((err) => {
                console.log(err)
              })
          .catch((err) => {
            console.log(err)
          })
      .catch((err) => {
        console.log(err);
      }))
  },*/

