//validation
const Joi = require('@hapi/joi');





//register validation
const registerValidation = (validation) =>{

  
    const schema = Joi.object({ name: Joi.string() .min(6) .required(),
        email: Joi.string() .min(6) .required() .email(),
        password: Joi.string() .min(6) .required(),
        product: Joi.string().required(),
        price: Joi.string(),
    });
    return schema.validate(validation);

};

//login vallidation
const loginValidation = (validation) =>{


    const schema = Joi.object({
        email: Joi.string() .min(6) .required() .email(),
        password: Joi.string() .min(6) .required()
    });
    return schema.validate(validation);
};



module.exports.registerValidation =registerValidation;
module.exports.loginValidation =loginValidation;