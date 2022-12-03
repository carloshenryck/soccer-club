import { Express } from 'express';
import loginRoute from './login.routes';
import teamRoute from './team.routes';
import matchRoute from './match.routes';

export default function createRoutes(app: Express) {
  app.use('/login', loginRoute);
  app.use('/teams', teamRoute);
  app.use('/matches', matchRoute);
}
