import Team from '../database/models/Team';

export default class teamService {
  static async getAllTeams(): Promise<Team[]> {
    const teams = await Team.findAll();
    return teams;
  }
}
