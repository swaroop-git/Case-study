const mongoose =require('mongoose');
const Schema = mongoose.Schema;

//create users Schema & model
const UserSchema = new Schema({
    name: {
        type:String,
        required: [true,'name field is required'],
        max:233,
        min:6
    },
    email:{
        type:String,
        required:true,
        max:255,
        min:6
    },
    phone:{
        type:Number,
    },
    password:{
        type:String,
        required:true,
        max:1023,
        min:6
    },
    date:{
        type: Date,
        default:Date.now
    }
     
});

const User = mongoose.model('users', UserSchema);

module.exports = User;