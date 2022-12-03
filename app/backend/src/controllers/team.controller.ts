import { Request, Response } from 'express';
import teamService from '../services/team.service';

export default class TeamController {
  static async getAllTeams(_req: Request, res: Response) {
    const teams = await teamService.getAllTeams();
    res.status(200).json(teams);
  }

  static async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await teamService.getTeamById(+id);
    res.status(200).json(team);
  }
}
