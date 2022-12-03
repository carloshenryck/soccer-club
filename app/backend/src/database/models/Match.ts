import { Model, INTEGER, NUMBER, BOOLEAN } from 'sequelize';
import db from '.';

class Match extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  homeTeam: NUMBER,
  homeTeamGoals: NUMBER,
  awayTeam: NUMBER,
  awayTeamGoals: NUMBER,
  inProgress: BOOLEAN,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  timestamps: false,
});

export default Match;
