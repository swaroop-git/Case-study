const router = require ('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const {registerValidation,loginValidation}= require('../validation');

router.post('/register',async(req,res)=>{
    //res.send('registerd');

    //validate the data before we add user
    const{error}=registerValidation(req.body);
    if(registerValidation.error){
        res.status(400).send(registerValidation.error.details[0].message);
        return;
    }

    //checking if the user is already in the database
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist)return res.status(400).send('Email already exists');


    //Hash the passwords
    const salt =await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    

    //creat a new user 
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);

    }catch(err){
        res.status(400).send(err)
    }
});

//login user
router.post('/login',async(req,res)=>{
    //validate data before login
    const{error}=loginValidation(req.body);
    if(loginValidation.error){
        res.status(400).send(loginValidation.error.details[0].message);
        return;
    }

    //checking if the email is exist
    const user = await User.findOne({email:req.body.email});
    if(!user)return res.status(400).send('Email or password is wrong');
    
    //checking password
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass)return res.status(400).send('invalid password');

    res.send('successfully logged in');

});

module.exports = router;