const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
var nodemailer = require("nodemailer");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var transporter = nodemailer.createTransport({
    service : 'gmail',
    auth:{
        user: 'swarooplute5@gmail.com',
        pass: 'Swaroop@1998'
    }
});

var mailOptions = {
    from:'swarooplute5@gmail.com',
    to:'swarooplute7@gmail.com',
    subject: 'Welcome to deals and coupons finder app',
    text:`Hi, we welcome you to deals and coupons finder app `
}

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
                email_address: req.body.email_address,
                password: hash,
            });
            user.save().then(function (result) {
                console.log(result);
                res.status(200).json({
                    success: 'New user has been created..'
                });
            }).catch(error => {
                res.status(500).json({
                    error: err
                });
            });
           
        }
    });
});


    transporter.sendMail(mailOptions,(err0r,info)=>{
        if (error){
            console.log(error);
        }else{
            console.log('Email sent: ' + info.response);
        }
    });


router.post('/login', function (req, res) {

    userModel.findOne({ email_address: req.body.email_address })
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
                        email_address: user.email_address,
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
                message: 'Post created...',
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