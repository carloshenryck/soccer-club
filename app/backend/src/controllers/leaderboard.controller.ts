import { Request, Response } from 'express';

import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  static async getTeamHomeStats(_req: Request, res: Response) {
    const teams = await LeaderboardService.getHomeTeamsStats();
    res.status(200).json(teams);
  }

  static async getTeamAwayStats(_req: Request, res: Response) {
    const teams = await LeaderboardService.getAwayTeamsStats();
    res.status(200).json(teams);
  }
}
