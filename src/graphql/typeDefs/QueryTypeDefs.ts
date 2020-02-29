import { gql } from 'apollo-server-koa';

const QueryTypeDefs = gql`
  type Query {
    getStat(state: EState!): Stat
  }
`;

export default QueryTypeDefs;
