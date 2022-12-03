import { Express } from 'express';
import loginRoute from './login.routes';
import teamRoute from './team.routes';

export default function createRoutes(app: Express) {
  app.use('/login', loginRoute);
  app.use('/teams', teamRoute);
}
