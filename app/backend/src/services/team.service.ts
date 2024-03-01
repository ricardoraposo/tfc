import httpCode from '../utils/httpCode';
import TeamRepository from '../repository/team/teamRepository';
import SequelizeTeamRepository from '../repository/team/sequelizeTeamRepository';

export default class TeamService {
  constructor(private teamRepository: TeamRepository = new SequelizeTeamRepository()) { }

  public async getTeams() {
    const teams = await this.teamRepository.getTeams();
    return { status: httpCode.ok, data: teams };
  }
}
