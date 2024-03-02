import httpCode from '../utils/httpCode';
import MatchRepository from '../repository/match/matchRepository';
import SequelizeMatchRepository from '../repository/match/sequelizeMatchRepository';

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
}
