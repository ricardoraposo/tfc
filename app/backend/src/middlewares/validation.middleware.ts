import { NextFunction, Request, Response } from 'express';

import httpCode from '../utils/httpCode';
import { loginDTOSchema } from '../dto/LoginDTO';

export function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  const { error } = loginDTOSchema.validate({ email, password });
  if (error) {
    if (error.details[0].type === 'string.email' || error.details[0].type === 'string.min') {
      return res.status(httpCode.unauthorized).json({ message: error.message });
    }
    return res.status(httpCode.badRequest).json({ message: error.message });
  }

  next();
}

export default {
  validateLogin,
};
