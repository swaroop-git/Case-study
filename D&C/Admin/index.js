const express = require('express');
const app = express();
const adminsRightsRouter = require('./routes/a');
// var adminController = require('../controllers/insert-admin-controller');
// var userController = require('../../users/controllers/insert-user-controller');
// // var router = express.Router();
// var userModel = require('../../users/models/user-models');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const auth = require('./routes/auth');
const swaggerJsDoc1 = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Extended: https://swagger.io/specification/#infoObject
// const swaggerOptions = {
//     swaggerDefinition: {
//       openapi: '3.0.0',
//       info: {
//         version: "1.0.0",
//         title: "Deals and Coupons Finder App -- Admins Microservice.",
//         description: "This application is built using Node.js.",
//         contact: {
//           name: "Amazing Web Developer"
//         }
//     },
//         servers: [
//             {
//                 url: "http://localhost:3000"
//             }
//             ]
//     },

//     // ['.routes/*.js']
//     apis: ["./routes/*.js"]
//   };
  
  

const swaggerDocument = require("./swagger.json");


// var swaggerDocs = swaggerJsDoc1(swaggerOptions);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
const PORT = 8080;

app.use('/a',adminsRightsRouter);
app.use(auth);
app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

//conection to database
const dbURI = 'mongodb://localhost/Admins'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((result) => console.log('connected to db')
         // app.listen(3000)
         )
      .catch((err) => console.log(err));
  mongoose.Promise=global.Promise;





//error handling middleware
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});


module.exports = {
  app: app,
  adminsRightsRouter: adminsRightsRouter
}



