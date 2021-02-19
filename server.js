// Import dependencies
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const clinicController = require("./controllers/cliniccontroller");
const usersController = require("./controllers/userController");
const appController = require("./controllers/appController");
const sequelize = require("./models/index");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");

//const {UniqueConstraintError} = require ('sequelize / types')

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
  console.log(`Request_Endpoint: ${req.method} ${req.url}`);
  next();
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/api/v1", (req, res) => {
  res.json({
    message: "Welcome to Appointment Booker API",
  });
});

// Configure the bodyParser middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: "*",
  })
);

app.options("*", cors());

//all clinic list
app.get("/api/v1/clinics", clinicController.listClinics);

app.get("/api/v1/myclinic", appController.findAvailableAppointment);

app.get("/api/v1/slots", appController.findAvailableAppointment);

//create appointment
app.post("/api/v1/createmyappointment", appController.createAppointment);

//cancel user appointment
app.delete("/api/v1/users/cancelappt", appController.cancelAppointment);

/*
 ** USER ON-BOARDING ROUTES
 */

// user registration
app.post("/api/v1/users/register", usersController.register);

// user login route
app.post("/api/v1/users/login", usersController.login);

// user profile route
app.get("/api/v1/users/dashboard", verifyJWT, usersController.getUserProfile);

// user profile route
app.get("/api/v1/users/profile", verifyJWT, usersController.getUserProfile);

// get user appointments
app.get(
  "/api/v1/users/myappointment",
  /* verifyJWT,*/ appController.getAppointment
);

// Configure our server to listen on the port defiend by our port variable
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));

function verifyJWT(req, res, next) {
  // get the jwt token from the request header
  const authToken = req.headers["x-auth-token"];
  console.log(authToken);
  // check if authToken header value is empty, return err if empty
  if (!authToken) {
    res.status(400).json({
      success: false,
      message: "Auth header value is missing",
    });
    return;
  }

  // verify that JWT is valid and not expired
  try {
    console.log("line117 " + authToken);

    // if verify success, proceed
    const userData = jwt.verify(authToken, process.env.JWT_SECRET, {
      algorithms: "HS384",
    });
    next();
  } catch (err) {
    console.log(err);
    //console.log("line127 " + authToken);
    // if fail, return error msg
    res.status(400).json({
      success: false,
      message: "Auth token is invalid",
    });
    return;
  }
}
