import { Team } from './Team';

export interface Match {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam?: Team
  awayTeam?: Team
}
