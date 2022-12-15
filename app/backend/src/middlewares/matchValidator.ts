import { Request, Response, NextFunction } from 'express';
import { BadRequest, UnprocessableEntity } from '../@types/errors';

const validateMatch = (req: Request, _res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

  if (!homeTeam || !awayTeam || homeTeamGoals === undefined || awayTeamGoals === undefined) {
    console.log(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);
    throw new BadRequest('All fields must be filled');
  }

  if (homeTeam === awayTeam) {
    throw new UnprocessableEntity('It is not possible to create a match with two equal teams');
  }

  next();
};

export default validateMatch;
