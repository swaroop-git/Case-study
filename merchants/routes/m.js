const express = require('express');
const router = express.Router();
const Merchant = require('../models/merchant');



//get a list of merchants from the db
router.get('/merchant', function(req,res){
    res.send("hello world!");
});

//add a new merchants to db
router.post('/merchant', function(req,res,next){
    //console.log(req.body);
    Merchant.create(req.body).then(function(merchant){
      res.send(merchant);
    }).catch(next);
    
   /* 
    res.send({
        type:'POST'
  
    });
    */
    
});


//update a merchants in db
router.put('/merchant/:id', function(req,res){
    res.send({type:'PUT'});
});

//delete a merchants from db
router.delete('/merchant/:id', function(req,res){
    Merchant.findByIdAndRemove({_id:req.params.id}).then(function(merchant){
        res.send(merchant);
    });
    res.send({type:'DELETE'});
});

module.exports = router;