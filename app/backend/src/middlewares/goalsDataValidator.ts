import { Request, Response, NextFunction } from 'express';
import { BadRequest } from '../@types/errors';

const validateGoalsData = (req: Request, _res: Response, next: NextFunction) => {
  const { homeTeamGoals, awayTeamGoals } = req.body;

  if (!homeTeamGoals || !awayTeamGoals) {
    throw new BadRequest('All fields must be filled');
  }

  next();
};

export default validateGoalsData;
