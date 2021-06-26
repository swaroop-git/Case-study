const mongoose =require('mongoose');
const Schema = mongoose.Schema;

//create users Schema & model
const UserSchema = new Schema({
    name: {
        type:String,
        required: [true,'name field eis required']
    },
    email_address:{
        type:String,
    },
    phone:{
        type:Number,
    },
    password:{
        type:String
    },
     
});

const User = mongoose.model('users', UserSchema);

module.exports = User;