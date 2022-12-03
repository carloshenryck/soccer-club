import { NotFound } from '../@types/errors';
import Team from '../database/models/Team';

export default class teamService {
  static async getAllTeams(): Promise<Team[]> {
    const teams = await Team.findAll();
    return teams;
  }

  static async getTeamById(id: number): Promise<Team> {
    const team = await Team.findOne({ where: { id } });

    if (!team) {
      throw new NotFound('Team not found');
    }

    return team;
  }
}
