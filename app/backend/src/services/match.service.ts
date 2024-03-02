import httpCode from '../utils/httpCode';
import TeamRepository from '../repository/team/teamRepository';
import MatchRepository from '../repository/match/matchRepository';
import { ChangeMatchScoreDTO } from '../dto/ChangeMatchScoreDTO';
import SequelizeTeamRepository from '../repository/team/sequelizeTeamRepository';
import SequelizeMatchRepository from '../repository/match/sequelizeMatchRepository';
import { CreateMatchDTO } from '../dto/CreateMatchDTO';

export default class MatchService {
  constructor(
    private readonly matchRepository: MatchRepository = new SequelizeMatchRepository(),
    private readonly teamRepository: TeamRepository = new SequelizeTeamRepository(),
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

  async createMatch(createMatchDTO: CreateMatchDTO) {
    if (createMatchDTO.homeTeamId === createMatchDTO.awayTeamId) {
      return {
        status: httpCode.unprocessableEntity,
        data: { message: 'It is not possible to create a match with two equal teams' },
      };
    }

    const homeTeam = await this.teamRepository.getTeamById(createMatchDTO.homeTeamId);
    if (!homeTeam) {
      return { status: httpCode.notFound, data: { message: 'There is no team with such id!' } };
    }

    const awayTeam = await this.teamRepository.getTeamById(createMatchDTO.awayTeamId);
    if (!awayTeam) {
      return { status: httpCode.notFound, data: { message: 'There is no team with such id!' } };
    }

    const match = await this.matchRepository.createMatch(createMatchDTO);
    return { status: httpCode.created, data: match };
  }
}
