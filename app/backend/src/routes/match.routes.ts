import * as express from 'express';

import { errorHandlerWrapper } from '../middlewares/errorHandler';
import validateToken from '../middlewares/tokenValidator';
import validateMatch from '../middlewares/matchValidator';
import validateGoalsData from '../middlewares/goalsDataValidator';

import MatchController from '../controllers/match.controller';

const router = express.Router();

router.get(
  '/',
  errorHandlerWrapper(MatchController.getAllMatches),
);

router.post(
  '/',
  validateToken,
  validateMatch,
  errorHandlerWrapper(MatchController.createMatch),
);

router.patch(
  '/:id/finish',
  errorHandlerWrapper(MatchController.finishMatch),
);

router.patch(
  '/:id',
  validateToken,
  validateGoalsData,
  errorHandlerWrapper(MatchController.updateMatchGoals),
);

export default router;
