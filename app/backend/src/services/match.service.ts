import { IMatchQuery } from '../@types/IMatchQuery';
import { IMatchData } from '../@types/IMatchData';

import Match from '../database/models/Match';
import Team from '../database/models/Team';

export default class TeamService {
  static async getAllMatches(query: IMatchQuery): Promise<Match[]> {
    const isInProgress = query === 'true' || query === 'false' ? (query === 'true') : null;

    const matches = await Match.findAll({
      where: isInProgress === null ? {} : { inProgress: isInProgress },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  }

  static async createMatch(matchData: IMatchData): Promise<Match> {
    const match = await Match.create({ ...matchData, inProgress: true });
    return match;
  }
}
