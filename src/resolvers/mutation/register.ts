import { extendType } from 'nexus';
import { stringArg } from 'nexus/dist';
import { Context } from '../../index';
import hashPassword from '../../helpers/hashPassword';
import { generateJWT } from '../../helpers/jwt';

export const Register = extendType({
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
        let hashedPassword = await hashPassword(password);
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
