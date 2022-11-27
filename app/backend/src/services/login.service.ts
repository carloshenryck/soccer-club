import { ILoginData, IUserDataFromDatabase } from '../@types/ILogin';
import User from '../database/models/User';
import * as jwtUtils from '../utils/jwt.util';

export default class LoginService {
  static async validateLogin({ email }: ILoginData): Promise<string> {
    const user = await User.findOne({ where: { email } });
    const { password: ps, ...userWithoutPassword } = user?.dataValues as IUserDataFromDatabase;
    const token = jwtUtils.createToken(userWithoutPassword);
    return token;
  }
}
