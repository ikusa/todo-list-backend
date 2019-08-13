import { prisma } from '../generated/prisma-client';
import { GraphQLServer } from 'graphql-yoga';
import { schema } from './schema';

const server = new GraphQLServer({
  schema,
  context: { prisma },
});

async function main(): Promise<void> {
  server.start(() => console.log('Server is running on http://localhost:4000'));
}

main().catch(e => console.error(e));
