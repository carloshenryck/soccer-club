import * as express from 'express';
import loginRoute from './login.routes';

const routers = express.Router();

routers.use('/login', loginRoute);

export default routers;
