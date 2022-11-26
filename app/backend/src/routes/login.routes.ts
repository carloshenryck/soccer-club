import * as express from 'express';
import LoginController from '../controllers/login.controller';

const router = express.Router();

router.post('/', LoginController.login);

export default router;
