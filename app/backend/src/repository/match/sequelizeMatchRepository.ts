import { CreateMatchDTO } from '../../dto/CreateMatchDTO';
import { ChangeMatchScoreDTO } from '../../dto/ChangeMatchScoreDTO';
import MatchModel from '../../database/models/MatchModel';
import MatchRepository from './matchRepository';
import TeamModel from '../../database/models/TeamModel';

export default class SequelizeMatchRepository implements MatchRepository {
  private readonly matchModel = MatchModel;

  async getMatches(): Promise<MatchModel[]> {
    const result = await this.matchModel.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return result;
  }

  async getInProgressMatches(inProgress: boolean): Promise<MatchModel[]> {
    const result = await this.matchModel.findAll({
      where: { inProgress },
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return result;
  }

  async changeMatchStatus(id: number) {
    const [affectedCount] = await this.matchModel.update({ inProgress: false }, { where: { id } });
    return affectedCount;
  }

  async changeMatchScores(id: number, goals: ChangeMatchScoreDTO) {
    const { homeTeamGoals, awayTeamGoals } = goals;
    const [affectedCount] = await this
      .matchModel
      .update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return affectedCount;
  }

  async createMatch(craeteMatchDTO: CreateMatchDTO): Promise<MatchModel> {
    const result = await this.matchModel.create({
      ...craeteMatchDTO,
      inProgress: true,
    });

    return result;
  }
}
