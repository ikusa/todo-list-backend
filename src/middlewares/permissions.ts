import { rule, shield } from 'graphql-shield';

let isAuthenticated = rule()(async (_, __, ctx) => {
  return ctx.userId != '';
});

let permissions = shield({
  Query: {
    todoes: isAuthenticated,
  },
  Mutation: {
    createTodo: isAuthenticated,
    updateTodo: isAuthenticated,
  },
});

export { permissions };
