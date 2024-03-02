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
}
