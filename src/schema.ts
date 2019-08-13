import { prisma } from '../generated/prisma-client';
import datamodelInfo from '../generated/nexus-prisma';
import * as path from 'path';
import { prismaObjectType, makePrismaSchema } from 'nexus-prisma';

import { Todo, Auth } from './typeSchemas';
import { Register, Login } from './resolvers/mutation/auth';

let Query = prismaObjectType({
  name: 'Query',
  definition(t) {
    t.prismaFields(['todoes']);
  },
});

let Mutation = prismaObjectType({
  name: 'Mutation',
  definition(t) {
    t.prismaFields(['createTodo', 'updateTodo']);
  },
});

export let schema = makePrismaSchema({
  types: [Query, Mutation, Todo, Auth, Register, Login],

  prisma: {
    datamodelInfo,
    client: prisma,
  },

  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
});
