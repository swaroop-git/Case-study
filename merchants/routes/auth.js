// const merchantModel = require('../models/merchant');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const mongoose = require('mongoose');
// const express = require('express');
// const app = express();
// const router = express.Router();
// const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());



// router.post('/signup', function (req, res) {
//     bcrypt.hash(req.body.password, 10, function (err, hash) {
//         if (err) {
//             return res.status(500).json({
//                 error: err
//             });
//         }
//         else {
//             const merchant = new merchantModel({
//                 name: req.body.name,
//                 email_address: req.body.email_address,
//                 password: hash,
//             });
//             merchant.save().then(function (result) {
//                 console.log(result);
//                 res.status(200).json({
//                     success: 'New merchant has been created..'
//                 });
//             }).catch(error => {
//                 res.status(500).json({
//                     error: err
//                 });
//             });
//         }
//     });
// });

// router.post('/signin', function (req, res) {

//     merchantModel.findOne({ email_address: req.body.email_address })
//         .exec()
//         .then(function (merchant) {
//             bcrypt.compare(req.body.password, merchant.password, function (err, result) {
//                 if (err) {
//                     return res.status(401).json({
//                         failed: 'Unauthorized Access'
//                     });
//                 }
//                 if (result) {
//                     const JWTToken = jwt.sign({
//                         email_address: merchant.email_address,
//                     },
//                         'secretkey',
//                         {
//                             expiresIn: '2h'
//                         });
//                     return res.status(200).json({
//                         success: 'Welcome to the JWT Auth',
//                         token: JWTToken
//                     });
//                 }
//                 return res.status(401).json({
//                     failed: 'The Password is incorrect.'
//                 });
//             });
//         })
//         .catch(error => {
//             res.status(500).json({
//                 failed: "This Email-ID does not exist."
//             });
//         });
// });

// router.post('/posts', verifyToken, (req, res) => {
//     jwt.verify(req.token, 'secretkey', (err, authData) => {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             res.json({
//                 message: 'Post created...',
//                 authData
//             });
//         }
//     });
// });

// // Verify Token
// function verifyToken(req, res, next) {
//     // Get auth header value
//     const bearerHeader = req.headers['authorization'];
//     // Check if bearer is undefined
//     if (typeof bearerHeader !== 'undefined') {
//         // Split at the space
//         const bearer = bearerHeader.split(' ');
//         // Get token from array
//         const bearerToken = bearer[1];
//         // Set the token
//         req.token = bearerToken;
//         // Next middleware
//         next();
//     } else {
//         // Forbidden
//         res.sendStatus(403);
//     }

// }
const router = require ('express').Router();
const Merchant = require('../models/merchant');
const bcrypt = require('bcryptjs');
const {registerValidation,loginValidation}= require('../validation');

router.post('/register',async(req,res)=>{
    //res.send('registerd');

    //validate the data before we add merchant
    const{error}=registerValidation(req.body);
    if(registerValidation.error){
        res.status(400).send(registerValidation.error.details[0].message);
        return;
    }

    //checking if the merchant is already in the database
    const emailExist = await Merchant.findOne({email:req.body.email});
    if(emailExist)return res.status(400).send('Email already exists');


    //Hash the passwords
    const salt =await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    

    //creat a new merchant 
    const merchant = new Merchant({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword
    });
    try{
        const savedMerchant = await merchant.save();
        res.send(savedMerchant);

    }catch(err){
        res.status(400).send(err)
    }
});

//login merchant
router.post('/login',async(req,res)=>{
    //validate data before login
    const{error}=loginValidation(req.body);
    if(loginValidation.error){
        res.status(400).send(loginValidation.error.details[0].message);
        return;
    }

    //checking if the email is exist
    const merchant = await Merchant.findOne({email:req.body.email});
    if(!user)return res.status(400).send('Email or password is wrong');
    
    //checking password
    const validPass = await bcrypt.compare(req.body.password,merchant.password);
    if(!validPass)return res.status(400).send('invalid password');

    res.send('successfully logged in');

});

module.exports = router;