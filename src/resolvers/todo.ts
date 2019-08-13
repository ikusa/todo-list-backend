import { queryField, mutationField, stringArg, booleanArg, idArg } from 'nexus';
import { Context } from '../index';

export let Todoes = queryField('todoes', {
  type: 'Todo',
  list: true,
  resolve: async (_, __, ctx: Context) => {
    return await ctx.prisma.todoes({ where: { user: { id: ctx.userId } } });
  },
});

export let CreateTodo = mutationField('createTodo', {
  type: 'Todo',
  args: {
    task: stringArg({ required: true }),
    dueDate: stringArg({ required: true }),
  },
  resolve: async (_, { task, dueDate }, ctx: Context) => {
    return await ctx.prisma.createTodo({
      task,
      dueDate,
      user: { connect: { id: ctx.userId } },
    });
  },
});

export let UpdateTodo = mutationField('updateTodo', {
  type: 'Todo',
  args: {
    id: idArg({ required: true }),
    task: stringArg(),
    dueDate: stringArg(),
    done: booleanArg(),
  },
  resolve: async (_, { id, ...data }, ctx: Context) => {
    let exist = await ctx.prisma.$exists.todo({
      AND: [{ id }, { user: { id: ctx.userId } }],
    });
    if (!exist) {
      throw new Error('todo not found');
    }
    return await ctx.prisma.updateTodo({ data, where: { id } });
  },
});
