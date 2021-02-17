const sequelize = require('../models/index')

const Clinics= require('../models/clinic')
const ClinicModel = Clinics(sequelize.sequelize, sequelize.Sequelize.DataTypes)

const controllers = {
    listClinics: (req, res) => {
    ClinicModel.findAll({
        attributes: ['id', 'clinic_name', ] 
      })
          .then(response => {
              return res.status(200).json({
                  success: true,
                  clinics: response
              })
          })
          .catch(err => {
              console.log(err)
              return res.status(400).json({
                  success: false,
                  message: 'finding clinics failed'
              })
          })
        }
}

module.exports = controllers