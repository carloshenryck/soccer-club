import { Request, Response } from 'express';
import { IRequestWithUser } from '../@types/IRequestWithUser';

import LoginService from '../services/login.service';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await LoginService.validateLogin({ email, password });
    res.status(200).json({ token });
  }

  static async loginValidate(req: IRequestWithUser, res: Response) {
    const role = req.user?.role;
    res.status(200).json({ role });
  }
}
