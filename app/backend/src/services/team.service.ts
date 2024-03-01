import httpCode from '../utils/httpCode';
import TeamRepository from '../repository/team/teamRepository';
import SequelizeTeamRepository from '../repository/team/sequelizeTeamRepository';

export default class TeamService {
  constructor(private teamRepository: TeamRepository = new SequelizeTeamRepository()) { }

  async getTeams() {
    const teams = await this.teamRepository.getTeams();
    return { status: httpCode.ok, data: teams };
  }

  async getTeamById(id: number) {
    const team = await this.teamRepository.getTeamById(id);
    if (!team) return { status: httpCode.notFound, data: { message: 'Team does not exists' } };
    return { status: httpCode.ok, data: team };
  }
}
