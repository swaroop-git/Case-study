const express = require('express');
const router = express.Router();
const Merchant = require('../models/merchant');



/**
 * @openapi
 * components:
 *      schemas:
 *          Merchant:
 *              type: object
 *              required:
 *                  - name
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The auto_generated id of the merchant.
 *                  name:
 *                      type: string
 *                      description: Name of the merchant.
 *                  product:
 *                      type: string
 *                      description: Name of the product of the respective merchant.
 *                  available:
 *                      type: string
 *                      description: Tells whether the product is available or not.
 *                  price:
 *                      type: string
 *                      description: Displays the price of the product.
 *              example:
 *                  id: d5fE_asz
 *                  name: Amazon
 *                  product: Trimmer
 *                  available: True
 *                  price: 30
 */





/**
 * @openapi
 * /m/merchant:
 *      get:
 *          summary: Returns list of merchants
 *          tags: [Merchant]
 *          responses:
 *              200:
 *                  description: The list of the merchants
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              items:
 *                                  $ref: '#/components/schemas/Merchant'
 *              
 */              



router.get('/merchant', function(req,res){
    Merchant.find().then((merchant) =>{
        res.json(merchant)
    }).catch((err) => {
        if(err){
            throw err
        }
    })
});



/**
 * @openapi
 * /m/merchant:
 *      post:
 *          summary: Create a new merchant in the merchant collections of the DealsandCouponsUsers Database.
 *          tags: [Merchant] 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Merchant'
 *          responses:
 *              '200':
 *                  description: OK.
 *                  content:
 *                      text/plain:
 *                          schema:
 *                              type: string
 *                              example: Merchant Data inserted successfully.
 */




 //add a new merchants to db
router.post('/merchant', function(req,res,next){
    //console.log(req.body);
    Merchant.create(req.body).then(function(merchant){
      res.status(201).json(merchant);
    }).catch();
    
   /* 
    res.send({
        type:'POST'
  
    });
    */
    
});


/**
 * @openapi
 * /m/merchant/{id}:
 *      put:
 *          summary: Update a merchant by its id in the merchant collections of the D&C Database.
 *          tags: [Merchant] 
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
 *                                  product: milk,paneer,etc
 *                                  price: 200
 *                                  
 *              '404':
 *                  description: The user was not found.
 *              '500':
 *                  description: There was some server error.
 */



 //update a merchants in db
router.put('/merchant/:id', function(req,res){
    //res.send("merchant updated");
    Merchant.findByIdAndUpdate({_id: req.params.id}, req.body , {new: true}, function(err, result){

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
 * /m/merchant/{id}:
 *      delete:
 *          summary: delete the merchant from a list
 *          tags: [Merchant]
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The merchant id.
 *          responses:
 *              200:
 *                  description: The list of the merchants
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Merchant'
 */


 //delete a merchants from db
router.delete('/merchant/:id', function(req,res){
    Merchant.findByIdAndRemove({_id:req.params.id}).then(function(merchant){
        res.status(200).send("merchant mar gya ");
    });
    //res.send("merchant deleted");
});

module.exports = router;