import { NextFunction, Request, Response } from 'express';

import httpCode from '../utils/httpCode';
import { verifyToken } from '../utils/auth';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(httpCode.unauthorized).json({ message: 'Token not found' });
  }

  const token = authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(httpCode.unauthorized).json({ message: 'Token must be a valid token' });
  }

  res.locals.payload = payload;
  next();
}
