import * as bcrypt from 'bcryptjs';

import { signToken } from '../utils/auth';
import httpCode from '../utils/httpCode';
import { LoginDTO } from '../dto/LoginDTO';
import UserRepository from '../repository/user/userRepository';
import SequelizeUserRepository from '../repository/user/sequelizeUserRepository';

export default class LoginService {
  constructor(
    private readonly userRepository: UserRepository = new SequelizeUserRepository(),
  ) { }

  async signIn({ email, password }: LoginDTO) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      return { status: httpCode.unauthorized, data: { message: 'Invalid email or password' } };
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return { status: httpCode.unauthorized, data: { message: 'Invalid email or password' } };
    }

    const token = signToken({ email: user.email, id: user.id });

    return { status: httpCode.ok, data: { token } };
  }
}
