const express = require('express');
const router = express.Router();
const Deals = require('../models/deals&coupons');






/**
 * @openapi
 * /d/deals:
 *      get:
 *          summary: Returns list of deals
 *          tags: [Deals]
 *          responses:
 *              200:
 *                  description: The list of the deals
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              items:
 *                                  $ref: '#/components/schemas/Deals'
 *              
 */              





router.get('/deals', function(req,res){
    Deals.find().then((deals) =>{
        res.json(deals)
    }).catch((err) => {
        if(err){
            throw err
        }
    })
});

 
/**
 * @openapi
 * /d/deals/{id}:
 *      get:
 *          summary: Returns deal with id
 *          tags: [Deals]
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
 *                                  $ref: '#/components/schemas/Deals'
 *    
 */              




router.get('/deals/:id', function(req,res){
    Deals.findById(req.params.id, (err,data) => {
        if(err){
        res.status(404).json({success: false, error: err});
        }
        else{
        res.status(200).json(data);
        }
    })
});



/**
 * @openapi
 * /d/deals:
 *      post:
 *          summary: Create a new deal in the deals collections of the D&C deals Database.
 *          tags: [Deals] 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Deals'
 *          responses:
 *              '200':
 *                  description: OK.
 *                  content:
 *                      text/plain:
 *                          schema:
 *                              type: string
 *                              example: Deals Data inserted successfully.
 */



 //add a new deals to db
router.post('/deals', function(req,res,next){
    console.log(req.body);
    Deals.create(req.body).then(function(deals){
      res.status(201).json(deals);
    }).catch();
    
   /* 
    res.send({
        type:'POST'
  
    });
    */
    
});




/**
 * @openapi
 * /d/deals/{id}:
 *      put:
 *          summary: Update a deal by its id in the deals collections of the D&C Database.
 *          tags: [Deals] 
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The deals id.
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
 *                  description: The deals was not found.
 *              '500':
 *                  description: There was some server error.
 */





 //update a deals in db
router.put('/deals/:id', function(req,res){
    //res.send("deals updated");
    Deals.findByIdAndUpdate({_id: req.params.id}, req.body , {new: true}, function(err, result){

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
 * /d/deals/{id}:
 *      delete:
 *          summary: delete a deal from a list
 *          tags: [Deals]
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The user id.
 *          responses:
 *              200:
 *                  description: This deal is been removed. 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Deals'
 */


 //delete a delete from db
router.delete('/deals/:id', function(req,res){
    Deals.findByIdAndRemove({_id:req.params.id}).then(function(merchant){
        res.status(200).send("deals with id "+(req.params.id)+" is deleted");
    });
    //res.send("deals deleted");
});

module.exports = router;