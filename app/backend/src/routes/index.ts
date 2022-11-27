import { Express } from 'express';
import loginRoute from './login.routes';

export default function createRoutes(app: Express) {
  app.use('/login', loginRoute);
}
