import { Request, Response, NextFunction } from 'express';
import { BadRequest } from '../@types/errors';

const validateLogin = (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest('All fields must be filled');
  }

  next();
};

export default validateLogin;
