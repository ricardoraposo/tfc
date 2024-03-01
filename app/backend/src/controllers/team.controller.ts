import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  constructor(
    private readonly teamService: TeamService = new TeamService(),
  ) { }

  async getTeams(_req: Request, res: Response) {
    try {
      const { status, data } = await this.teamService.getTeams();
      return res.status(status).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getTeamById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status, data } = await this.teamService.getTeamById(+id);
      return res.status(status).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
