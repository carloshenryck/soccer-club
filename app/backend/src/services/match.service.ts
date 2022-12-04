import { IMatchQuery } from '../@types/IMatchQuery';
import { IMatchData } from '../@types/IMatchData';
import { NotFound } from '../@types/errors';

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
    const homeTeam = await Team.findByPk(matchData.homeTeam);
    const awayTeam = await Team.findByPk(matchData.awayTeam);

    if (!homeTeam || !awayTeam) {
      throw new NotFound('There is no team with such id!');
    }

    const match = await Match.create({ ...matchData, inProgress: true });
    return match;
  }

  static async finishMatch(id: number): Promise<void> {
    const match = await Match.findOne({ where: { id } });

    if (!match) {
      throw new NotFound('Match not found!');
    }

    await Match.update({
      inProgress: false,
    }, { where: { id } });
  }
}
