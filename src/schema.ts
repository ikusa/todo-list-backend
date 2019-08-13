import { prisma } from '../generated/prisma-client';
import datamodelInfo from '../generated/nexus-prisma';
import * as path from 'path';
import { prismaObjectType, makePrismaSchema } from 'nexus-prisma';

import { Todo, Auth } from './typeSchemas';
import { Register, Login } from './resolvers/auth';
import { Todoes, CreateTodo, UpdateTodo } from './resolvers/todo';

let Query = prismaObjectType({
  name: 'Query',
  definition() {},
});

let Mutation = prismaObjectType({
  name: 'Mutation',
  definition() {},
});

export let schema = makePrismaSchema({
  types: [Query, Mutation, Todo, Auth, Register, Login, Todoes, CreateTodo, UpdateTodo],

  prisma: {
    datamodelInfo,
    client: prisma,
  },

  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
});
