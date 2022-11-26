import * as jwt from 'jsonwebtoken';

require('dotenv/config');

export interface IuserFromDatabase {
  id: number,
  username: string,
  role: string,
  email: string,
  password?: string,
}

const createToken = (data: IuserFromDatabase): string => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET as string, {
    algorithm: 'HS256',
  });

  return token;
};

export {
  createToken,
};
