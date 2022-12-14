import { teamStats } from './teamStats';

export interface ITeamsStats {
  name: string;
  totalPoints: teamStats;
  totalGames: teamStats;
  totalVictories: teamStats;
  totalDraws: teamStats;
  totalLosses: teamStats;
  goalsFavor: teamStats;
  goalsOwn: teamStats;
  goalsBalance: teamStats;
  efficiency: number;
}
