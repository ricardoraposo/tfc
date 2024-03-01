import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(
    private readonly loginService: LoginService = new LoginService(),
  ) { }

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const { status, data } = await this.loginService.signIn({ email, password });
      return res.status(status).json(data);
    } catch (error) {
      console.error('Error while signing in', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
