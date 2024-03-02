import { Request, Response } from 'express';
import MatchService from '../services/match.service';

const internalServerError = 'Internal server error';

export default class MatchController {
  constructor(
    private readonly matchService: MatchService = new MatchService(),
  ) { }

  async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    try {
      const { status, data } = await this
        .matchService
        .getMatches(inProgress !== undefined ? inProgress === 'true' : undefined);

      return res.status(status).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: internalServerError });
    }
  }

  async changeMatchStatus(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const { status, data } = await this.matchService.changeMatchStatus(+id);
      return res.status(status).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: internalServerError });
    }
  }

  async changeMatchScores(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    try {
      const { status, data } = await this
        .matchService
        .changeMatchScores(+id, { homeTeamGoals, awayTeamGoals });

      return res.status(status).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: internalServerError });
    }
  }
}
