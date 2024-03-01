import UserModel from '../../database/models/UserModel';
import { User } from '../../Interfaces/User';
import UserRepository from './userRepository';

export default class SequelizeUserRepository implements UserRepository {
  private readonly userModel = UserModel;

  async getUserByEmail(email: string): Promise<User | null> {
    const result = await this.userModel.findOne({ where: { email } });
    if (!result) return null;

    const user = result.dataValues;
    return user;
  }
}
