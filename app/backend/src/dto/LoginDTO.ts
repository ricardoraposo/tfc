import Joi = require('joi');

export type LoginDTO = {
  email: string;
  password: string;
};

const emptyFieldMessage = 'All fields must be filled';
const invalidFieldMessage = 'Invalid email or password';

export const loginDTOSchema = Joi.object<LoginDTO>({
  email: Joi.string().email().required().messages({
    'string.email': invalidFieldMessage,
    'string.empty': emptyFieldMessage,
    'any.required': emptyFieldMessage,
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': invalidFieldMessage,
    'string.empty': emptyFieldMessage,
    'any.required': emptyFieldMessage,
  }),
});
