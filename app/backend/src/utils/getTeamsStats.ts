import { ITeamsWithMatchs } from '../@types/ITeamsWithMatchs';
import { ITeamsStats } from '../@types/ITeamsStats';
import { teamStats } from '../@types/teamStats';
import Match from '../database/models/Match';

type team = 'teamHome' | 'teamAway';

const home = (awayOrHome: team) => (awayOrHome === 'teamHome' ? 'homeTeamGoals' : 'awayTeamGoals');
const away = (awayOrHome: team) => (awayOrHome === 'teamHome' ? 'awayTeamGoals' : 'homeTeamGoals');

const totalVictories = (teamMatches: Match[] | undefined, awayOrHome: team): teamStats => {
  const homeTeamGoals = home(awayOrHome);
  const adversaryGoals = away(awayOrHome);

  return teamMatches?.reduce(
    (acc, curr) => (curr[`${homeTeamGoals}`] > curr[`${adversaryGoals}`] ? acc + 1 : acc),
    0,
  );
};

const totalLosses = (teamMatches: Match[] | undefined, awayOrHome: team): teamStats => {
  const homeTeamGoals = home(awayOrHome);
  const adversaryGoals = away(awayOrHome);

  return teamMatches?.reduce(
    (acc, curr) => (curr[`${homeTeamGoals}`] < curr[`${adversaryGoals}`] ? acc + 1 : acc),
    0,
  );
};

const totalDraws = (teamMatches: Match[] | undefined, awayOrHome: team): teamStats => {
  const homeTeamGoals = home(awayOrHome);
  const adversaryGoals = away(awayOrHome);

  return teamMatches?.reduce(
    (acc, curr) => (curr[`${homeTeamGoals}`] === curr[`${adversaryGoals}`] ? acc + 1 : acc),
    0,
  );
};

const totalPoints = (victories: teamStats, draws: teamStats): teamStats => {
  const teamVictories = victories === undefined ? 0 : victories;
  const teamDraws = draws === undefined ? 0 : draws;
  return teamVictories * 3 + teamDraws;
};

const goalsFavor = (teamMatches: Match[] | undefined, awayOrHome: team) => {
  const homeTeamGoals = home(awayOrHome);
  return teamMatches?.reduce((acc, curr) => acc + curr[`${homeTeamGoals}`], 0);
};

const goalsOwn = (teamMatches: Match[] | undefined, awayOrHome: team) => {
  const awayTeamGoals = away(awayOrHome);
  return teamMatches?.reduce((acc, curr) => acc + curr[`${awayTeamGoals}`], 0);
};

const goalsBalance = (favor: teamStats, own: teamStats): teamStats => {
  const favorGoals = favor === undefined ? 0 : favor;
  const ownGoals = own === undefined ? 0 : own;
  return favorGoals - ownGoals;
};

const calculateEfficiency = (points: teamStats, games: teamStats): number => {
  const totalPoint = points === undefined ? 0 : points;
  const totalGames = games === undefined ? 0 : games;
  return +((totalPoint / (totalGames * 3)) * 100).toFixed(2);
};

export const ordenateByPoints = (teams: ITeamsStats[]): ITeamsStats[] => {
  const halfOrdenated = teams.sort((a, b) => (
    (b.totalPoints ?? 0) - (a.totalPoints ?? 0)
      || (b.totalVictories ?? 0) - (a.totalVictories ?? 0)
      || (b.goalsBalance ?? 0) - (a.goalsBalance ?? 0)
      || (b.goalsFavor ?? 0) - (a.goalsFavor ?? 0)
  ));

  return halfOrdenated;
};

export const getTeamStats = (team: ITeamsWithMatchs, awayOrHome: team): ITeamsStats => {
  const victories = totalVictories(team[`${awayOrHome}`], `${awayOrHome}`);
  const draws = totalDraws(team[`${awayOrHome}`], `${awayOrHome}`);
  const points = totalPoints(victories, draws);
  const favor = goalsFavor(team[`${awayOrHome}`], `${awayOrHome}`);
  const own = goalsOwn(team[`${awayOrHome}`], `${awayOrHome}`);

  const stats = {
    name: team.teamName,
    totalPoints: points,
    totalGames: team[`${awayOrHome}`]?.length,
    totalVictories: victories,
    totalDraws: draws,
    totalLosses: totalLosses(team[`${awayOrHome}`], `${awayOrHome}`),
    goalsFavor: favor,
    goalsOwn: own,
    goalsBalance: goalsBalance(favor, own),
    efficiency: calculateEfficiency(points, team[`${awayOrHome}`]?.length),
  };

  return stats;
};
