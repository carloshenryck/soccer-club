import User from '../database/models/User';
import * as jwtUtils from '../utils/jwt.util';

interface IUserInfo {
  email: string,
  password: string,
}

export interface IuserFromDatabase {
  id: number,
  username: string,
  role: string,
  email: string,
  password?: string,
}

export default class LoginService {
  static async validateLogin({ email }: IUserInfo): Promise<string> {
    const user = await User.findOne({ where: { email } });
    const { password: ps, ...userWithoutPassword } = user?.dataValues as IuserFromDatabase;
    const token = jwtUtils.createToken(userWithoutPassword);
    return token;
  }
}
