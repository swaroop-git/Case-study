const express = require('express');
const router = express.Router();
const User = require('../models/user');
const axios = require('axios');

const deal = "http://localhost:2000/d";


/**
 * @openapi
 * components:
 *      schemas:
 *          User:
 *              type: object
 *              required:
 *                  - name
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The auto_generated id of the user.
 *                  name:
 *                      type: string
 *                      description: Name of the user.
 *                  email_address:
 *                      type: string
 *                      description: email_address of the respective user.
 *                  phone:
 *                      type: string
 *                      description: shows the users phone no..
 *              example:
 *                  id: d5fE_asz
 *                  name: Amazon
 *                  email_address: xyz@gmail.com
 *                  phone: 12345
 */





/**
 * @openapi
 * /u/user:
 *      get:
 *          summary: Returns list of users
 *          tags: [User]
 *          responses:
 *              200:
 *                  description: The list of the users
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              items:
 *                                  $ref: '#/components/schemas/User'
 *              
 */              



router.get('/user', function(req,res){
    User.find().then((user) =>{
        res.json(user)
    }).catch((err) => {
        if(err){
            throw err
        }
    })
});


//Deals connection
router.get('/deals',(req,res)=>{
    axios.get(deal+'/deals').then((response)=>{
        res.send(response.data);
    });

});


/**
 * @openapi
 * /u/user:
 *      post:
 *          summary: Create a new users in the users collections of the D&C Users Database.
 *          tags: [User] 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          responses:
 *              '200':
 *                  description: OK.
 *                  content:
 *                      text/plain:
 *                          schema:
 *                              type: string
 *                              example: user Data inserted successfully.
 */




 //add a new user to db
router.post('/user', function(req,res,next){
    console.log(req.body);
    User.create(req.body).then(function(user){
      res.status(201).json(user);
    }).catch();
    
   /* 
    res.send({
        type:'POST'
  
    });
    */
    
});


/**
 * @openapi
 * /u/user/{id}:
 *      put:
 *          summary: Update a user by its id in the user collections of the D&C Users Database.
 *          tags: [User] 
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The merchant id.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {}
 *          responses:
 *              '200':
 *                  description: OK.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example: 
 *                                  id: d5fE_asz
 *                                  name: raju-dudhwala
 *                                  emai_address: 
 *                                  phone: 12435
 *                                  
 *              '404':
 *                  description: The user was not found.
 *              '500':
 *                  description: There was some server error.
 */



 //update a user in db
router.put('/user/:id', function(req,res){
    //res.send("user updated");
    User.findByIdAndUpdate({_id: req.params.id}, req.body , {new: true}, function(err, result){

        if(err){
            res.status(404).json(err);
        }
        else{
            res.status(200).json(result);
        }

    })
});


/**
 * @openapi
 * /u/user/{id}:
 *      delete:
 *          summary: delete the user from a list
 *          tags: [User]
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The user id.
 *          responses:
 *              200:
 *                  description: The list of the user 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/User'
 */


 //delete a user from db
router.delete('/user/:id', function(req,res){
    User.findByIdAndRemove({_id:req.params.id}).then(function(user){
        res.status(200).send("user is been deleted");
    });
    //res.send("merchant deleted");
});

module.exports = router;