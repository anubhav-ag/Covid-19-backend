// Import dependencies
const express = require('express')
const app = express();
const port = process.env.PORT || 5000
const sequelize = require('./models/index')
const Clinics= require('./models/clinic')
const ClinicModel = Clinics(sequelize.sequelize, sequelize.Sequelize.DataTypes)

const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path');

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});

// Configure the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Configure the CORs middleware
app.use(cors());


app.get('/api/v1/clinics', (req, res) => {
    ClinicModel.findAll({
      attributes: ['clinic_name',] 
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
})

// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
};

// Catch any bad requests
app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Catch All'
    });
});

// Configure our server to listen on the port defiend by our port variable
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`))