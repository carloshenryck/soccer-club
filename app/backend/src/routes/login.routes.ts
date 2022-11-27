import * as express from 'express';
import { errorHandlerWrapper } from '../middlewares/errorHandler';
import validateLogin from '../middlewares/loginValidator';
import LoginController from '../controllers/login.controller';

const router = express.Router();

router.post(
  '/',
  validateLogin,
  errorHandlerWrapper(LoginController.login),
);

export default router;
