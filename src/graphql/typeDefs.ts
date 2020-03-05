import { gql } from 'apollo-server-koa';

const typeDefs = gql`
  scalar DateTime

  enum EState {
    TOTAL
    QUARANTINE
    SEOUL
    BUSAN
    DAEGU
    INCHEON
    GWANGJU
    DAEJEON
    ULSAN
    SEJONG
    GYEONGGI
    GANGWON
    CHUNGBUK
    CHUNGNAM
    JEONBUK
    JEONNAM
    GYEONGBUK
    GYEONGNAM
    JEJU
  }

  type State {
    increase: Int!
    confirmator: Int!
    death: Int!
    incidence: Int!
    inspection: Int!
    updateAt: DateTime!
  }

  type Query {
    getState(state: EState): State!
    getIncrease(state: EState): Int!
    getConfirmator(state: EState): Int!
    getDeath(state: EState): Int!
    getIncidence(state: EState): Int!
    getInspection(state: EState): Int!
    whenUpdate(state: EState): DateTime!
  }

  type Mutation {
    requestUpdate: Boolean!
    registerApns(uuid: String!, token: String!): Boolean!
    unregisterApns(uuid: String!): Boolean!
  }
`;

export default typeDefs;
