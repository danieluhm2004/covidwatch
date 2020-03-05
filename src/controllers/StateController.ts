import EState from '../enums/EState';

class StateController {
  static getStateByText(text: string = 'total'): EState {
    switch (text.toLowerCase()) {
      case 'total':
        return EState.TOTAL;
      case 'quarantine':
        return EState.QUARANTINE;
      case 'seoul':
        return EState.SEOUL;
      case 'busan':
        return EState.BUSAN;
      case 'daegu':
        return EState.DAEGU;
      case 'incheon':
        return EState.INCHEON;
      case 'gwangju':
        return EState.GWANGJU;
      case 'daejeon':
        return EState.DAEJEON;
      case 'ulsan':
        return EState.ULSAN;
      case 'sejong':
        return EState.SEJONG;
      case 'gyeonggi':
        return EState.GYEONGGI;
      case 'gangwon':
        return EState.GANGWON;
      case 'chungbuk':
        return EState.CHUNGBUK;
      case 'chungnam':
        return EState.CHUNGNAM;
      case 'jeonbuk':
        return EState.JEONBUK;
      case 'jeonnam':
        return EState.JEONNAM;
      case 'gyeongbuk':
        return EState.GYEONGBUK;
      case 'gyeongnam':
        return EState.GYEONGNAM;
      case 'jeju':
        return EState.JEJU;
    }

    throw Error('Cannot find state enum.');
  }

  static getStateByDisplay(display: string): EState {
    switch (display) {
      case '합계':
        return EState.TOTAL;
      case '검역':
        return EState.QUARANTINE;
      case '서울':
        return EState.SEOUL;
      case '부산':
        return EState.BUSAN;
      case '대구':
        return EState.DAEGU;
      case '인천':
        return EState.INCHEON;
      case '광주':
        return EState.GWANGJU;
      case '대전':
        return EState.DAEJEON;
      case '울산':
        return EState.ULSAN;
      case '세종':
        return EState.SEJONG;
      case '경기':
        return EState.GYEONGGI;
      case '강원':
        return EState.GANGWON;
      case '충북':
        return EState.CHUNGBUK;
      case '충남':
        return EState.CHUNGNAM;
      case '전북':
        return EState.JEONBUK;
      case '전남':
        return EState.JEONNAM;
      case '경북':
        return EState.GYEONGBUK;
      case '경남':
        return EState.GYEONGNAM;
      case '제주':
        return EState.JEJU;
    }

    throw Error('Cannot find state enum.');
  }
}

export default StateController;
