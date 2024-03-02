import httpCode from '../utils/httpCode';
import MatchRepository from '../repository/match/matchRepository';
import SequelizeMatchRepository from '../repository/match/sequelizeMatchRepository';
import { ChangeMatchScoreDTO } from '../dto/ChangeMatchScoreDTO';

export default class MatchService {
  constructor(
    private readonly matchRepository: MatchRepository = new SequelizeMatchRepository(),
  ) { }

  async getMatches(filter: boolean | undefined) {
    if (filter !== undefined) {
      const matches = await this.matchRepository.getInProgressMatches(filter);
      return { status: httpCode.ok, data: matches };
    }

    const matches = await this.matchRepository.getMatches();
    return { status: httpCode.ok, data: matches };
  }

  async changeMatchStatus(matchId: number) {
    await this.matchRepository.changeMatchStatus(matchId);
    return { status: httpCode.ok, data: { message: 'Finished' } };
  }

  async changeMatchScores(matchId: number, goals: ChangeMatchScoreDTO) {
    await this.matchRepository.changeMatchScores(matchId, goals);
    return { status: httpCode.ok, data: { message: 'Scores changed' } };
  }
}
