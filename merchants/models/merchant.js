const mongoose =require('mongoose');
const Schema = mongoose.Schema;

//create merchant Schema & model
const MerchantSchema = new Schema({
    name: {
        type:String,
        required: [true,"name field is required"]
    },
    email:{
        type:String 
    },
    password:{
        type:String
    },
    product:{
        type:String
    },
    available:{
        type:Boolean,
        default:false
    },
    price:{
        type:Number,
    }
     
});

const Merchant = mongoose.model('merchant', MerchantSchema);

module.exports = Merchant;