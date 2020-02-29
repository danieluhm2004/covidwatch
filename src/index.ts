import Koa from 'koa';
import DotEnv from 'dotenv';
import Mongoose from 'mongoose';
import router from './routes';
import ErrorMiddleware from './middlewares/ErrorMiddleware';
import { ApolloServer, gql } from 'apollo-server-koa';
import Graphql from './graphql';

if (process.env.NODE_ENV === 'development') DotEnv.config();

const app = new Koa();

const typeDefs = gql`
  type Query {
    posts: String
  }
`;

const resolvers = {
  Query: {
    posts: () => 'Hello World',
  },
};

Mongoose.Promise = global.Promise;
Mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/covidwatch', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: true,
});

Mongoose.connection.once('connected', async () => {
  const apollo = new ApolloServer({ schema: Graphql });
  apollo.applyMiddleware({ app });

  app.use(ErrorMiddleware);
  app.use(router.routes());
  app.use(router.allowedMethods());

  app.listen(process.env.port || 8080, () => {
    console.log('🔗  - 서버가 활성화되었습니다.');
  });
});
