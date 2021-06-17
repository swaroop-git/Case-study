const express = require('express');
//const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//set up express app
const app = express();

//connect to mongodb

//const dbURI = 'mongodb://localhost/D&C'
//mongoose.connect('mongodb+srv://new-user-31:swaroop@cluster0.nijfg.mongodb.net/deals&coupons?retryWrites=true&w=majority', {useNewUrlParser: true}, {dbName: 'deals&coupons'})

/*
mongoose.connect('mongodb+srv://swaroop:swaroop@cluster0.nijfg.mongodb.net/Db1?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('connected to db')
       // app.listen(3000)
       )
    .catch((err) => console.log(err));
mongoose.Promise=global.Promise;
*/


/*
mongoose.connect('mongodb+srv://new-user-31:swaroop@cluster0.nijfg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {​​​​​useNewUrlParser: true}​​​​​, {​​​​​dbName: 'D&C'}​​​​​);
var conn = mongoose.connection;
conn.on('connected', function() {​​​​​ console.log('Database is connected successfully.');
 console.log("db object points to the database : "+ conn.name);
}​​​​​);
conn.on('disconnected',function(){​​​​​ 
    console.log('Database is disconnected successfully.');
}​​​​​);
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;
*/


/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://swaroop:swaroop@cluster0.nijfg.mongodb.net/Db1?retryWrites=true&w=majority&ssl=true";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("Db1").collection("merchants");
  // perform actions on the collection object
  console.log("connected to db");
  
});
*/
mongoose.connect("mongodb+srv://swaroop:swaroop@cluster0.nijfg.mongodb.net/test", () => {
    console.log("database connected");
});


/*
const  mongoAtlasUri = "mongodb+srv://new-user-31:swaroop@cluster0.nijfg.mongodb.net/D&C?retryWrites=true&w=majority";

try {
    mongoose.connect( mongoAtlasUri, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true}, () =>
    console.log("connected"));    
    }catch (error) { 
    console.log("could not connect");    
    }
*/
/*
const connection = 'mongodb+srv://swaroop:swaroop@cluster0.nijfg.mongodb.net/Db1?retryWrites=true&w=majority'

const connector = mongoose.connect(connection,{

    useNewUrlParser: true,

    useUnifiedTopology: true,

    useFindAndModify: false,

    useCreateIndex: true

})

mongoose.connection.on('connected',() => {

    console.log("Connected to database")

})

.then( (data) =>{

    var port = 8080 

    app.listen(port, () => {

        console.log(`Example app listening at http://localhost:${port}`)

    })

})
*/


/*
mongoose.connect('mongodb+srv://new-user-31:swaroop@cluster0.nijfg.mongodb.net/deals&coupons?retryWrites=true&w=majority', {useNewUrlParser: true}, {dbName: 'deals&coupons'})
var connect = mongoose.connection;
connect.on('connected', function() {

    console.log('Database is connected successfully.');

    console.log("db object points to the database : "+ conn.name);  

});
*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
//initialize routes
app.use('/m',require('./routes/m'));


//error handling middleware
app.use(function(err, req, res, next){
    console.log(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});




//listen for request

app.listen(process.env.port||4000, function(){

    console.log('now listening for request');
    
}); 