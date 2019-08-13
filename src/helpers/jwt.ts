import { sign, verify } from 'jsonwebtoken';

let SECRET = process.env.SECRET;

let generateJWT = (id: string): string => sign(id, SECRET);
let decodeJWT = (token: string): string => {
  try {
    let result = verify(token, SECRET);
    if (typeof result === 'string') {
      return result;
    }
    return '';
  } catch (e) {
    return '';
  }
};
export { generateJWT, decodeJWT };
