import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  constructor(
    private readonly matchService: MatchService = new MatchService(),
  ) { }

  async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const { status, data } = await this
      .matchService
      .getMatches(inProgress !== undefined ? inProgress === 'true' : undefined);

    return res.status(status).json(data);
  }

  async changeMatchStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchService.changeMatchStatus(+id);
    return res.status(status).json(data);
  }

  async changeMatchScores(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this
      .matchService
      .changeMatchScores(+id, { homeTeamGoals, awayTeamGoals });

    return res.status(status).json(data);
  }

  async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this
      .matchService
      .createMatch({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals });

    return res.status(status).json(data);
  }
}
