require("dotenv").config();
const axios = require("axios");
const sequelize = require('../models/index')
const jwt = require("jsonwebtoken");
const SHA256 = require("crypto-js/sha256");
const uuid = require("uuid");
const Slots = require('../models/slot')
const Users = require('../models/user')
const Appointments = require('../models/appointment')
const SlotModel = Slots(sequelize.sequelize, sequelize.Sequelize.DataTypes)
const AppointmentModel = Appointments(sequelize.sequelize, sequelize.Sequelize.DataTypes)
const UserModel = Users(sequelize.sequelize, sequelize.Sequelize.DataTypes)

//const _ = require("lodash");

//creating an appointment

const controllers ={
    /*
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
    

  newAppointment(req, res){
    getUserDetails(req, res)
    .then(response=>{
      // console.log(response)
      res.json(response)
    }
      
    )
    .catch(err=>{console.log(err)})
  },

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
      .then((response) => {
        if (!response) {
          res.json({ message: "no such user in database" })
          return
        }})
          .then((georespone) => {
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
  },
}


function getUserDetails(req, res) {
    //decode the jwt to retrieve the user iinfo
    const authToken = req.headers.auth_token;
    const rawJWT = jwt.decode(authToken);
    const email = rawJWT.email;
  
    //check the user databsase to see if the user exists using the above user info
  
    return UserModel.findOne({
      email: email,
      id: id
    });
  }
  

module.exports = controllers

