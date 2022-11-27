import * as jwt from 'jsonwebtoken';
import { IUserDataForToken } from '../@types/ILogin';

export const verifyToken = (token: string): IUserDataForToken => {
  const { JWT_SECRET } = process.env;
  return jwt.verify(token, JWT_SECRET as string) as IUserDataForToken;
};

export const createToken = (user: IUserDataForToken): string => {
  const token = jwt.sign(user, process.env.JWT_SECRET as string);
  return token;
};
