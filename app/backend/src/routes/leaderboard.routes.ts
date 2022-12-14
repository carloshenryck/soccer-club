import * as express from 'express';

import { errorHandlerWrapper } from '../middlewares/errorHandler';

import LeaderboardController from '../controllers/leaderboard.controller';

const router = express.Router();

router.get(
  '/',
  errorHandlerWrapper(LeaderboardController.getTeamStats),
);

router.get(
  '/home',
  errorHandlerWrapper(LeaderboardController.getTeamHomeStats),
);

router.get(
  '/away',
  errorHandlerWrapper(LeaderboardController.getTeamAwayStats),
);

export default router;
