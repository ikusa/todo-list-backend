import { extendType } from 'nexus';
import { stringArg } from 'nexus';
import { hash, compare } from 'bcrypt';

import { Context } from '../index';
import { generateJWT } from '../helpers/jwt';

export let Register = extendType({
  type: 'Mutation',
  definition: t => {
    t.field('register', {
      type: 'Auth',
      args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
        name: stringArg({ required: true }),
      },
      resolve: async (_, { email, password, name }, ctx: Context) => {
        let hashedPassword = await hash(password, 10);
        let { id } = await ctx.prisma.createUser({
          email,
          name,
          password: hashedPassword,
        });
        return { token: generateJWT(id) };
      },
    });
  },
});

export let Login = extendType({
  type: 'Mutation',
  definition: t => {
    t.field('login', {
      type: 'Auth',
      args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
      },
      resolve: async (_, { email, password }, ctx: Context) => {
        let user = await ctx.prisma.user({ email });
        const match = await compare(password, user.password);
        if (!match) {
          throw new Error('Invalid Password');
        }
        return { token: generateJWT(user.id) };
      },
    });
  },
});
