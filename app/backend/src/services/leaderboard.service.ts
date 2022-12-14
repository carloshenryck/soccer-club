import Team from '../database/models/Team';
import Match from '../database/models/Match';

import { getTeamStats, ordenateByPoints, sumStats } from '../utils/getTeamsStats';

export default class LeaderboardService {
  static async getHomeTeamsStats(): Promise<unknown> {
    const teams = await Team.findAll({
      include: { model: Match, as: 'teamHome', where: { inProgress: false } },
    });

    const stats = teams.map((team) => getTeamStats(team, 'teamHome'));
    const ordenatedStats = ordenateByPoints(stats);

    return ordenatedStats;
  }

  static async getAwayTeamsStats(): Promise<unknown> {
    const teams = await Team.findAll({
      include: { model: Match, as: 'teamAway', where: { inProgress: false } },
    });

    const stats = teams.map((team) => getTeamStats(team, 'teamAway'));
    const ordenatedStats = ordenateByPoints(stats);

    return ordenatedStats;
  }

  static async getTeamsStats(): Promise<unknown> {
    const teams = await Team.findAll({
      include: [
        { model: Match, as: 'teamAway', where: { inProgress: false } },
        { model: Match, as: 'teamHome', where: { inProgress: false } },
      ],
    });

    const stats = teams.map((team) => {
      const homeStats = getTeamStats(team, 'teamHome');
      const awayStats = getTeamStats(team, 'teamAway');
      return sumStats(homeStats, awayStats);
    });

    const ordenatedStats = ordenateByPoints(stats);

    return ordenatedStats;
  }
}
