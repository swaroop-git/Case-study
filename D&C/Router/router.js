var express = require('express');
var router = express.Router()
var adminService = require('./adminservice');
var dealsorcouponsService = require('./dealsorcoupons');
var merchantService = require('./merchantservice');
var userService = require('./userservice');
 
router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})
 
router.use(adminService);
router.use(dealsorcouponsService);
router.use(merchantService);
router.use(userService);
 
module.exports = router