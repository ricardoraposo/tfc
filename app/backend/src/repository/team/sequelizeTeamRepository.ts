import { Team } from '../../Interfaces/Team';
import TeamModel from '../../database/models/TeamModel';
import TeamRepository from './teamRepository';

export default class SequelizeTeamRepository implements TeamRepository {
  private readonly teamModel = TeamModel;

  async getTeams(): Promise<Team[]> {
    const result = await this.teamModel.findAll();
    const teams = result.map((team) => team.dataValues);
    return teams;
  }

  async getTeamById(id: number): Promise<Team | null> {
    const result = await this.teamModel.findByPk(id);
    if (!result) return null;
    const team = result.dataValues;
    return team;
  }
}
