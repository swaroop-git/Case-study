const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const axios = require('axios');
const user = "http://localhost:5000/u";
const merchant = "http://localhost:4000/m";


/**
 * @openapi
 * components:
 *      schemas:
 *          Admin:
 *              type: object
 *              required:
 *                  - name
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The auto_generated id of the user.
 *                  name:
 *                      type: string
 *                      description: Name of the admin.
 *                  password:
 *                      type: string
 *                      description: email_address of the respective admin.
 *                  phone:
 *                      type: string
 *                      description: shows the admin phone no..
 *              example:
 *                  id: d5fE_asz
 *                  name: swaroop
 *                  password: xy#@**
 *                  phone: 12345
 */





/**
 * @openapi
 * /a/admin:
 *      get:
 *          summary: Returns list of users
 *          tags: [Admin]
 *          responses:
 *              200:
 *                  description: The list of the users
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              items:
 *                                  $ref: '#/components/schemas/Admin'             
 */              



router.get('/admin', function(req,res){
    Admin.find().then((admin) =>{
        res.json(admin)
    }).catch((err) => {
        if(err){
            throw err
        }
    })
   // res.send("hello world")
});


/**
 * @openapi
 * /a/admin/{id}:
 *      get:
 *          summary: Returns admin with id
 *          tags: [Admin]
 *          parameters:
 *            - in: path
 *              name: id
 *          responses:
 *              200:
 *                  description: The list of the merchants
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              items:
 *                                  $ref: '#/components/schemas/Admin'
 *    
 */              




router.get('/admin/:id', function(req,res){
    Admin.findById(req.params.id, (err,data) => {
        if(err){
        res.status(404).json({success: false, error: err});
        }
        else{
        res.status(200).json(data);
        }
    })
});

//users connection
router.get('/users',(req,res)=>{
    axios.get(user+'/user').then((response)=>{
        res.send(response.data);
    });

});

//merchant connection
router.get('/merchants',(req,res)=>{
    axios.get(merchant+'/merchant').then((response)=>{
        res.send(response.data);
    });

});

/**
 * @openapi
 * /a/admin:
 *      post:
 *          summary: Create a new users in the users collections of the D&C Users Database.
 *          tags: [Admin] 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Admin'
 *          responses:
 *              '200':
 *                  description: OK.
 *                  content:
 *                      text/plain:
 *                          schema:
 *                              type: string
 *                              example: Admin Data inserted successfully.
 */




 //add a new Admin to db
router.post('/admin', function(req,res,next){
    console.log(req.body);
    Admin.create(req.body).then(function(admin){
      res.status(200).json(admin);
    }).catch(
        (err) => {
            if(err){
                throw err
            }
        }
    );
    
   /* 
    res.send({
        type:'POST'
  
    });
    */
    
});


// /**
//  * @openapi
//  * /a/admin/{id}:
//  *      put:
//  *          summary: Update a Admin by its id in the user collections of the D&C Users Database.
//  *          tags: [Admin] 
//  *          parameters:
//  *            - in: path
//  *              name: id
//  *              schema:
//  *                  type: string
//  *              required: true
//  *              description: The merchant id.
//  *          requestBody:
//  *              required: true
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          type: object
//  *                          example: {}
//  *          responses:
//  *              '200':
//  *                  description: OK.
//  *                  content:
//  *                      application/json:
//  *                          schema:
//  *                              type: object
//  *                              example: 
//  *                                  id: d5fE_asz
//  *                                  name: raju-dudhwala
//  *                                  password: *****
//  *                                  phone: 12435
//  *                                  
//  *              '404':
//  *                  description: The user was not found.
//  *              '500':
//  *                  description: There was some server error.
//  */



 //update a admin in db
router.put('/admin/:id', function(req,res){
    //res.send("admin updated");
    Admin.findByIdAndUpdate({_id: req.params.id}, req.body , {new: true}, function(err, result){

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
 * /a/admin/{id}:
 *      delete:
 *          summary: delete the admin from a list
 *          tags: [Admin]
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
 *                                  $ref: '#/components/schemas/Admin'
 */


 //delete a admin from db





router.delete('/admin/:id', function(req,res){
    Admin.findByIdAndDelete(req.params.id, function (err) {
        if(err){
        res.status(404).json({success: false, error: err});
        }
        else{
        res.status(200).send(`Admin's account deleted with _id: ${req.params.id}`);
        }
        });
    // Admin.findByIdAndRemove({_id:req.params.id}).then(function(user){
    //     res.status(200).send("admin is been deleted");
    // }).catch(
    //     (err) => {
    //         if(err){
    //             res.status(404)
    //             throw err
    //         }
           
    //     }
    // )
    //res.send("admin deleted");
});

module.exports = router;

