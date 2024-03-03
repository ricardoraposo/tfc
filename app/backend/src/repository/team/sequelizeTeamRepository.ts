import { Team } from '../../Interfaces/Team';
import TeamModel from '../../database/models/TeamModel';
import TeamRepository from './teamRepository';
import MatchModel from '../../database/models/MatchModel';

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

  async getTeamsWithMatches(): Promise<Team[]> {
    return this.teamModel.findAll({
      include: [
        { model: MatchModel, as: 'homeMatches', where: { inProgress: false } },
        { model: MatchModel, as: 'awayMatches', where: { inProgress: false } },
      ],
    });
  }
}
