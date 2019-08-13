import dotenv from 'dotenv';
dotenv.config();

import { prisma } from '../generated/prisma-client';
import { GraphQLServer } from 'graphql-yoga';
import { schema } from './schema';
import { ContextParameters } from 'graphql-yoga/dist/types';
import { decodeJWT } from './helpers/jwt';
import { permissions } from './middlewares/permissions';

export type Context = {
  prisma: typeof prisma;
  userId: string;
};

const server = new GraphQLServer({
  schema,
  context: ({ request }: ContextParameters) => {
    let token = request.get('token');
    let userId = decodeJWT(token);
    return {
      prisma,
      userId,
    };
  },
  middlewares: [permissions],
});

async function main(): Promise<void> {
  server.start(() => console.log('Server is running on http://localhost:4000'));
}

main().catch(e => console.error(e));
