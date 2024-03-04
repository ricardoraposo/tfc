import * as jwt from 'jsonwebtoken';

type Payload = {
  id: number;
  email: string;
};

export default class Auth {
  private static secret: jwt.Secret = process.env.JWT_SECRET || 'segredinhodaraposo';

  private static jwtConfig: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: '1d',
  };

  static signToken(payload: Payload) {
    const token = jwt.sign(payload, this.secret, this.jwtConfig);
    return token;
  }

  static verifyToken(token: string) {
    try {
      const payload = jwt.verify(token, this.secret) as Payload;
      return payload;
    } catch {
      return null;
    }
  }
}
