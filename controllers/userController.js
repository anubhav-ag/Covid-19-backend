require("dotenv").config();
const axios = require("axios");
const sequelize = require("../models/index");
const jwt = require("jsonwebtoken");
const SHA256 = require("crypto-js/sha256");
const uuid = require("uuid");
const Users = require("../models/user");
const Appointments = require("../models/appointment");
const Clinics = require("../models/clinic");
const Slots = require("../models/slot");
const UserModel = Users(sequelize.sequelize, sequelize.Sequelize.DataTypes);
const SlotModel = Slots(sequelize.sequelize, sequelize.Sequelize.DataTypes);
const ClinicModel = Clinics(sequelize.sequelize, sequelize.Sequelize.DataTypes);
const AppointmentModel = Appointments(
  sequelize.sequelize,
  sequelize.Sequelize.DataTypes
);

//const _ = require("lodash");

const controllers = {
  register: (req, res) => {
    res.setHeader("content-type", "application/json");

    UserModel.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((result) => {
        if (result) {
          console.log(result);
          res.statusCode = 400;
          res.json({
            success: false,
            message: "Username already exists",
          });
          res.send;
        }
      })
      .then((response) => {
        const salt = uuid.v4();
        const combination = salt + req.body.password;
        const hash = SHA256(combination).toString();

        UserModel.create({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          cellphone: req.body.cellphone,
          //slug: _.kebabCase(req.body.first_name + req.body.user_id),
          address: req.body.default_address,
          password: hash,
          pwsalt: salt,
        })
          .then((createResult) => {
            res.json({
              success: true,
              message: "New User is Registered",
            });
          })
          .catch((err) => {
            console.log(err);
            res.statusCode = 500;
            res.json({
              success: false,
              message: "unable to register due to unexpected error",
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.statusCode = 500;
        res.json({
          success: false,
          message: "unable to register due to unexpected error",
        });
      })
      .catch((err) => {
        console.log(err);
        res.statusCode = 500;
        res.json({
          success: false,
          message: "unable to register due to unexpected error",
        });
      });
  },

  login: (req, res) => {
    res.setHeader("content-type", "application/json");
    UserModel.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((result) => {
        console.log(result.pwsalt);
        // check if result is empty, if it is, no user, so login fail, return err as json response
        if (!result) {
          res.statusCode = 401;
          res.json({
            success: false,
            message: "Either username or password is wrong",
          });
          return;
        }

        // combine DB user salt with given password, and apply hash algo
        const hash = SHA256(result.pwsalt + req.body.password).toString();

        // check if password is correct by comparing hashes
        if (hash !== result.password) {
          res.statusCode = 401;
          res.json({
            success: false,
            message: "Either username or password is wrong",
          });
          return;
        }

        // login successful, generate JWT
        const token = jwt.sign(
          {
            first_name: result.first_name,
            last_name: result.last_name,
            email: result.email,
          },
          process.env.JWT_SECRET,
          {
            algorithm: "HS384",
            expiresIn: "1h",
          }
        );

        // decode JWT to get raw values
        const rawJWT = jwt.decode(token);

        // return token as json response
        res.json({
          success: true,
          token: token,
          expiresAt: rawJWT.exp,
          info: rawJWT,
        });
      })
      .catch((err) => {
        console.log(err + "line1477777777777")
        res.statusCode = 500;
        res.json({
          success: false,
          message: "unable to login due to unexpected error",
        });
      });
  },

  getUserProfile: (req, res) => {
    res.setHeader("content-type", "application/json");
    const authToken = req.headers["x-auth-token"];
    const rawJWT = jwt.decode(authToken);
    const email = rawJWT.email;
    let user_id_local;
    console.log(email);
    return UserModel.findOne({
      where: { email: email },
    }).then((emailresponse) => {
      console.log(emailresponse);
      if (!emailresponse) {
        res.status(400).json({ message: "no such user in database" });
        res.send;
      } else {
        AppointmentModel.findOne({
          where: {
            user_id: emailresponse.id,
          },
        }).then((apptResponse) => {
          if (!apptResponse) {
            res.status(200).json({ message: "no appointment" });
          } else {
            SlotModel.findOne({
              where: { id: apptResponse.slot_id },
            }).then((slotResponse) => {
              ClinicModel.findOne({
                where: {
                  id: slotResponse.clinic_id,
                },
              }).then((clinicResponse) => {
                res.status(200).json({
                  message: "has Appointment",
                  clinicData: clinicResponse,
                  slotData: slotResponse,
                  apptData: apptResponse,
                });
              });
            });
          }
        });

        //user_id_local = emailresponse.id;
      }
    });
  },
};

module.exports = controllers;
