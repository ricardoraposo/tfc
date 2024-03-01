import { User } from '../../Interfaces/User';

export default interface UserRepository {
  getUserByEmail(email: string): Promise<User | null>;
}
