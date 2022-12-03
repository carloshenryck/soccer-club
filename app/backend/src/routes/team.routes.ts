import * as express from 'express';

import { errorHandlerWrapper } from '../middlewares/errorHandler';

import TeamController from '../controllers/team.controller';

const router = express.Router();

router.get('/', errorHandlerWrapper(TeamController.getAllTeams));
router.get('/:id', errorHandlerWrapper(TeamController.getTeamById));

export default router;
