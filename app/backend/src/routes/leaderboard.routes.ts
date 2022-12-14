import * as express from 'express';

import { errorHandlerWrapper } from '../middlewares/errorHandler';

import LeaderboardController from '../controllers/leaderboard.controller';

const router = express.Router();

router.get(
  '/home',
  errorHandlerWrapper(LeaderboardController.getTeamHomeStats),
);

export default router;
