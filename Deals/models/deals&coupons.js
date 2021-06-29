const mongoose =require('mongoose');
const Schema = mongoose.Schema;

//create merchant Schema & model
const DealsandCouponSchema = new Schema({
    lmd_id: {
        type:String,
        required: [true,'name field is required']
    },
    store:{
        type:String,
        required: [true]
    },
    offer_text:{
        type:String,
        required: [true]
    },
    offer_value:{
        type:String,
        required: [true]
    },
    title:{
        type:String,
        required: [true],
        default:false
    },
    description:{
        type:String,
        required: [true]
    },
    code:{
        type:String,
        required: [true]
    },
    terms_and_conditions:{
        type:String,
        required: [true]
    },
    categories:{
        type:String,
        required: [true]
    },
    category_array:{
        Fashion:{
            type:Array
        }

    },
    featured:{
        type:String,
        required: [true]
    },
    url:{
        type:String,
        required: [true]
    },
    smartLink:{
        type:String,
        required: [true]
    },
    image_url:{
        type:String,
        required: [true]
    },
    type:{
        type:String
    },
    offer:{
        type:String,
        required: [true]
    },
    status:{
        type:String,
        required: [true]
    },
    status:{
        type:String,
        required: [true]
    },
    start_date:{
        type:String,
        required: [true]
    },
    end_date:{
        type:String,
        required: [true]
    }

     
});

const deals = mongoose.model('deals', DealsandCouponSchema);

module.exports = deals;