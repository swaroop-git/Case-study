// const router = require ('express').Router();
// const User = require('../models/user');
// const bcrypt = require('bcryptjs');
// const {registerValidation,loginValidation}= require('../validation');

// router.post('/register',async(req,res)=>{
//     //res.send('registerd');

//     //validate the data before we add user
//     const{error}=registerValidation(req.body);
//     if(registerValidation.error){
//         res.status(400).send(registerValidation.error.details[0].message);
//         return;
//     }

//     //checking if the user is already in the database
//     const emailExist = await User.findOne({email:req.body.email});
//     if(emailExist)return res.status(400).send('Email already exists');


//     //Hash the passwords
//     const salt =await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(req.body.password,salt);

    

//     //creat a new user 
//     const user = new User({
//         name:req.body.name,
//         email:req.body.email,
//         password:hashPassword
//     });
//     try{
//         const savedUser = await user.save();
//         res.send(savedUser);

//     }catch(err){
//         res.status(400).send(err)
//     }
// });

// //login user
// router.post('/login',async(req,res)=>{
//     //validate data before login
//     const{error}=loginValidation(req.body);
//     if(loginValidation.error){
//         res.status(400).send(loginValidation.error.details[0].message);
//         return;
//     }

//     //checking if the email is exist
//     const user = await User.findOne({email:req.body.email});
//     if(!user)return res.status(400).send('Email or password is wrong');
    
//     //checking password
//     const validPass = await bcrypt.compare(req.body.password,user.password);
//     if(!validPass)return res.status(400).send('invalid password');

//     res.send('successfully logged in');

// });

const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// router.post('/signup',(req,res)=>{
//     res.send('hello world');
// });

router.post('/signup', function (req, res) {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        else {
            const user = new userModel({
                name: req.body.name,
                email: req.body.email,
                password: hash,
            });
            user.save().then(function (result) {
                console.log(result);
                res.status(200).json({
                    success: 'New admin has been created..'
                });
            }).catch(error => {
                res.status(500).json({
                    error: err
                });
            });
        }
    });
});

router.post('/login', function (req, res) {

    userModel.findOne({ email: req.body.email})
        .exec()
        .then(function (user) {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (err) {
                    return res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                }
                if (result) {
                    const JWTToken = jwt.sign({
                        email: user.email,
                    },
                        'secretkey',
                        {
                            expiresIn: '2h'
                        });
                    return res.status(200).json({
                        success: 'Welcome to the JWT Auth',
                        token: JWTToken
                    });
                }
                return res.status(401).json({
                    failed: 'The Password is incorrect.'
                });
            });
        })
        .catch(error => {
            res.status(500).json({
                failed: "This Email-ID does not exist."
            });
        });
});

router.post('/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Admin successfully logged in.....',
                authData
            });
        }
    });
});

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }

}

module.exports = router;