const Joi = require('joi');

const {NAME_REGEXP} = require('../constants/regexp.enum');

const joiValidatorSchema = Joi.object({
    
  name: Joi.string().regex(NAME_REGEXP).required().error(new Error('Name is not valid'))
});


module.exports = {
  joiValidatorSchema
};
