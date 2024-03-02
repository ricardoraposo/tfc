import { Request, Response } from 'express';
import MatchService from '../services/match.service';

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
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
