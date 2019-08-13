import { hash } from 'bcrypt';

let saltRound = 10;

export default (password: string) => {
  return hash(password, saltRound);
};
