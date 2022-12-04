import * as express from 'express';

import { errorHandlerWrapper } from '../middlewares/errorHandler';

import MatchController from '../controllers/match.controller';

const router = express.Router();

router.get(
  '/',
  errorHandlerWrapper(MatchController.getAllMatches),
);

router.post(
  '/',
  errorHandlerWrapper(MatchController.createMatch),
);

router.patch(
  '/:id/finish',
  errorHandlerWrapper(MatchController.finishMatch),
);

export default router;
