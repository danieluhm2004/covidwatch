import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { makeExecutableSchema } from 'apollo-server-koa';

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
