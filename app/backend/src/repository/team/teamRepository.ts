import { Team } from '../../Interfaces/Team';

export default interface TeamRepository {
  getTeams(): Promise<Team[]>;
  getTeamById(id: number): Promise<Team | null>;
}
