import * as express from 'express';

import { IRequestWithUser } from '../@types/IRequestWithUser';

import { errorHandlerWrapper } from '../middlewares/errorHandler';
import validateToken from '../middlewares/tokenValidator';
import validateLogin from '../middlewares/loginValidator';

import LoginController from '../controllers/login.controller';

const router = express.Router();

router.get(
  '/validate',
  validateToken,
  errorHandlerWrapper((req: IRequestWithUser, res) => LoginController.loginValidate(req, res)),
);

router.post(
  '/',
  validateLogin,
  errorHandlerWrapper(LoginController.login),
);

export default router;
