const Joi = require('joi');

const registerSchema = Joi.object({
  fullName: Joi.string().required().max(50),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8).pattern(new RegExp('^(?=.*[A-Z])(?=.*\\d)')),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')),
  dateOfBirth: Joi.date().required(),
  phoneNumber: Joi.string().required().pattern(/^\d{10}$/),
  address: Joi.string().required().max(100),
  city: Joi.string().required().max(50).pattern(/^[a-zA-Z\s]*$/),
  state: Joi.string().required(),
  zipCode: Joi.string().required().length(6),
  country: Joi.string().required(),
  securityQuestion: Joi.string().required(),
  securityAnswer: Joi.string().required().max(100),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
