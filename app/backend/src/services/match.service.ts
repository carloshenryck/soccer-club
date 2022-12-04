import { IMatchQuery } from '../@types/IMatchQuery';
import { IMatchData } from '../@types/IMatchData';
import { NotFound, UnprocessableEntity } from '../@types/errors';
import { IGoals } from '../@types/IGoals';

import Match from '../database/models/Match';
import Team from '../database/models/Team';

export default class MatchService {
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
    await MatchService.getMatchById(id);
    await Match.update({
      inProgress: false,
    }, { where: { id } });
  }

  static async updateMatchGoals(id: number, goalsData: IGoals): Promise<Match> {
    const match = await MatchService.getMatchById(id);

    if (!match.inProgress) {
      throw new UnprocessableEntity('Match have already finished');
    }

    await Match.update({
      homeTeamGoals: goalsData.homeTeamGoals,
      awayTeamGoals: goalsData.awayTeamGoals,
    }, { where: { id } });

    return { ...match.dataValues, ...goalsData };
  }

  static async getMatchById(id: number): Promise<Match> {
    const match = await Match.findOne({ where: { id } });

    if (!match) {
      throw new NotFound('Match not found!');
    }

    return match;
  }
}
