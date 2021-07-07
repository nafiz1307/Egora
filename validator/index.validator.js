const Joi = require("@hapi/joi");

const userSignupValidation = (data) => {
  const schema = {
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(data, schema);
};

module.exports.userSignupValidation = userSignupValidation;
