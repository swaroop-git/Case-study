var express = require('express');
var app = express();
var PORT = 8000;
var router = require('./coupons/couponsexternalapi');
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
// const CouponsAPI = require('./couponsexternalapi')
// const asyncApiCall = async () => {
//     const response = await CouponsAPI.getCompatibility();
//     console.log(response.data);
// }
// asyncApiCall()

app.use(router);
  
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})