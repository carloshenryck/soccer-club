import { Request } from 'express';
import { IUserDataForToken } from './ILogin';

export interface IRequestWithUser extends Request {
  user?: IUserDataForToken;
}
