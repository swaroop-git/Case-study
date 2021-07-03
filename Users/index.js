// const express = require('express');
// //const routes = require('./routes/api');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');


// //set up express app
// const app = express();

// //connect to mongodb
// //mongoose.connect('mongodb://localhost/ninjago');
// const dbURI = 'mongodb://localhost/D&C'
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then((result) => console.log('connected to db')
//        // app.listen(3000)
//        )
//     .catch((err) => console.log(err));
// mongoose.Promise=global.Promise;

// app.use(bodyParser.json());

// //initialize routes
// app.use('/u',require('./routes/u'));


// //error handling middleware
// app.use(function(err, req, res, next){
//     console.log(err); // to see properties of message in our console
//     res.status(422).send({error: err.message});
// });




// //listen for request

// app.listen(process.env.port||5000, function(){

//     console.log('now listening for request');
    
// }); 


const express = require('express');
//set up express app
const cors = require("cors");
//const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const router = require('./routes/auth')

var rout = require('./routes/u');

// Extended: http://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        version: "1.0.0",
        title: "Deals and Coupons Finder App.",
        description: "This application is built using Nodejs.",
        contact: {
          name: "Amazing Developer"
        }
    },
        servers: [
            {
                url: "http://localhost:5000"
            }
            ]
    },

    // ['.routes/*.js']
    apis: ["./routes/*.js"]
  };
  
  
  

  const dbURI = 'mongodb://localhost/Users'
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((result) => console.log('connected to db')
         // app.listen(3000)
         )
      .catch((err) => console.log(err));
  mongoose.Promise=global.Promise;

/*
const dotenv = require("dotenv");

dotenv.config();
*/


/*
mongoose.connect(("mongodb+srv://swaroop:swaroop@cluster0.nijfg.mongodb.net/DB1?retryWrites=true&w=majority"), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,  
      })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));
*/


//mongoose.connect("mongodb+srv://swaroop:swaroop@cluster0.nijfg.mongodb.net/Db1", () => {
  //  console.log("database connected");
//});










const swaggerDocs = swaggerJsDoc(swaggerOptions);
const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


//initialize routes
app.use('/u',rout);
app.use('/u',router);



//error handling middleware
app.use(function(err, req, res, next){
    console.log(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});

//listen for request

app.listen(process.env.port||6000, function(){

    console.log('now listening for request');
    
}); 


module.exports = {
  app: app,
  adminsRightsRouter: rout
 }