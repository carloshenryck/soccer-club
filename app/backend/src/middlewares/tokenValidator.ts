import { Response, NextFunction } from 'express';
import { IRequestWithUser } from '../@types/IRequestWithUser';
import { verifyToken } from '../utils/jwt.util';
import { Unauthorized } from '../@types/errors';

const validateToken = (req: IRequestWithUser, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Unauthorized('Token not found');
  }

  try {
    const user = verifyToken(authorization);
    req.user = user;
    next();
  } catch (e) {
    throw new Unauthorized('Expired or invalid token');
  }
};

export default validateToken;
