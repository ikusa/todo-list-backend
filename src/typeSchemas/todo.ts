import { prismaObjectType } from 'nexus-prisma';

export default prismaObjectType({
  name: 'Todo',
  definition(t) {
    t.prismaFields(['id', 'task', 'dueDate', 'done', 'createdAt']);
  },
});
