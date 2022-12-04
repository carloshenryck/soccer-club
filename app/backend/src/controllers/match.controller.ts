import { Request, Response } from 'express';

import { IMatchQuery } from '../@types/IMatchQuery';

import MatchService from '../services/match.service';

export default class MatchController {
  static async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matches = await MatchService.getAllMatches(inProgress as IMatchQuery);
    res.status(200).json(matches);
  }

  static async createMatch(req: Request, res: Response) {
    const matchData = req.body;
    const match = await MatchService.createMatch(matchData);
    res.status(201).json(match);
  }

  static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    await MatchService.finishMatch(+id);
    res.status(200).json({ message: 'Finished' });
  }

  static async updateMatchGoals(req: Request, res: Response) {
    const { id } = req.params;
    const goalsData = req.body;
    const match = await MatchService.updateMatchGoals(+id, goalsData);
    res.status(200).json(match);
  }
}
