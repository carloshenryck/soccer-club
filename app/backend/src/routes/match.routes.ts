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

export default router;
