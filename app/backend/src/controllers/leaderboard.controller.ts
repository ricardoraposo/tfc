import { Request, Response } from 'express';
import httpCode from '../utils/httpCode';
import LearderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(
    private readonly leaderboardService: LearderboardService = new LearderboardService(),
  ) { }

  async getLeaderboardHome(_req: Request, res: Response) {
    const leaderboard = await this.leaderboardService.getLeaderboardHome();
    res.status(httpCode.ok).json(leaderboard);
  }

  async getLeaderboardAway(_req: Request, res: Response) {
    const leaderboard = await this.leaderboardService.getLeaderboardAway();
    res.status(httpCode.ok).json(leaderboard);
  }

  async getLeaderboard(_req: Request, res: Response) {
    const leaderboard = await this.leaderboardService.getLeaderboard();
    res.status(httpCode.ok).json(leaderboard);
  }
}
