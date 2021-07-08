const Joi = require("@hapi/joi");

const userSignupValidation = (data) => {
  const schema = {
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(data, schema);
};

const loginValidation = (data) => {
  const schema = {
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(data, schema);
};

module.exports.loginValidation = loginValidation;
module.exports.userSignupValidation = userSignupValidation;
