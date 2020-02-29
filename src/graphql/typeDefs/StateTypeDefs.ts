import { gql } from 'apollo-server-koa';

const StateTypeDefs = gql`
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
`;

export default StateTypeDefs;
