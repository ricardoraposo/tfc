import * as jwt from 'jsonwebtoken';

type Payload = {
  id: number;
  email: string;
};

const secret = process.env.JWT_SECRET || 'segredinhoDoRaposo';

export function signToken(payload: Payload) {
  const token = jwt.sign(payload, secret, { expiresIn: '1d' });
  return token;
}

export function verifyToken(token: string) {
  try {
    const payload = jwt.verify(token, secret) as Payload;
    return payload;
  } catch {
    return null;
  }
}
