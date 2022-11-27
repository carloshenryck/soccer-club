import { compare } from 'bcryptjs';
import { Unauthorized } from '../@types/errors';
import { ILoginData, IUserDataFromDatabase } from '../@types/ILogin';
import User from '../database/models/User';
import * as jwtUtils from '../utils/jwt.util';

export default class LoginService {
  static async validateLogin({ email, password }: ILoginData): Promise<string> {
    const user = await User.findOne({ where: { email } });

    if (!user || !await compare(password, user.password)) {
      throw new Unauthorized('Incorrect email or password');
    }

    const { password: ps, ...userWithoutPassword } = user?.dataValues as IUserDataFromDatabase;
    const token = jwtUtils.createToken(userWithoutPassword);
    return token;
  }
}
