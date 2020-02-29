import { gql } from 'apollo-server-koa';

const StatTypeDefs = gql`
  type Stat {
    total: Int
    increase: Int
  }
`;

export default StatTypeDefs;
