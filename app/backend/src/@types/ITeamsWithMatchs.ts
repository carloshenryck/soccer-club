import Team from '../database/models/Team';
import Match from '../database/models/Match';

export interface ITeamsWithMatchs extends Team {
  teamHome?: Match[],
  teamAway?: Match[],
}
