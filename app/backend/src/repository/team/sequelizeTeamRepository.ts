import { Team } from '../../Interfaces/Team';
import TeamModel from '../../database/models/TeamModel';
import TeamRepository from './teamRepository';

export default class SequelizeTeamRepository implements TeamRepository {
  private readonly teamModel = TeamModel;

  public async getTeams(): Promise<Team[]> {
    const result = await this.teamModel.findAll();
    const teams = result.map((team) => team.dataValues);
    return teams;
  }
}
