import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(
    private readonly loginService: LoginService = new LoginService(),
  ) { }

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.loginService.signIn({ email, password });
    return res.status(status).json(data);
  }

  async getRole(_req: Request, res: Response) {
    const { id } = res.locals.payload;
    const { status, data } = await this.loginService.getUserRole(id);
    return res.status(status).json(data);
  }
}
