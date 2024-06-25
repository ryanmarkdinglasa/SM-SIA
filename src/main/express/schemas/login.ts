import Joi from 'joi';

export const LoginSchema = Joi.object({
  UserName: Joi.string().required(),
  Password: Joi.string().required(),
});