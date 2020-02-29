import StatModel from '../models/StatModel';
import Moment from 'moment';
import Cheerio from 'cheerio';
import Got from 'got';
import StateController from './StateController';
import IStatIsolation from '../interfaces/IStatIsolation';
import IStatInspection from '../interfaces/IStatInspection';

class CrawlerController {
  private static url = 'http://ncov.mohw.go.kr/bdBoardList_Real.do?brdGubun=13';
  /* brdGubun: 11 -> 발생동향 | 12 -> 확진환자 이동경로 | 13 -> 시도별 발생동향 */

  public static async requestCrawling() {
    const isOutdated = await CrawlerController.isOutdated();
    if (!isOutdated) return false;

    return await CrawlerController.onRequest();
  }

  private static async isOutdated(): Promise<boolean> {
    const latestOne = await StatModel.findOne()
      .sort({ timestamp: -1 })
      .select('timestamp');

    if (!latestOne) return true;
    const timestamp = Moment(latestOne.timestamp);
    timestamp.add(3, 'hours');
    if (!timestamp.isBefore()) return false;
    return true;
  }

  private static async onRequest() {
    try {
      const res = await Got(this.url);
      const $ = Cheerio.load(res.body);

      const displayTime = $('.timetable > p > span').text();
      const timestamp = CrawlerController.getTimeByDisplay(displayTime);
      const rows = $('tbody > tr').toArray();

      for (const row of rows) {
        try {
          const _$ = $(row);
          const displayState = _$.find('th').text();
          const state = StateController.getStateByDisplay(displayState);
          const fields = _$.find('td.number').toArray();
          const increase = parseInt($(fields[0]).text());
          const isolationTotal = parseInt($(fields[1]).text());
          const isolationProcess = parseInt($(fields[2]).text());
          const isolationRelease = parseInt($(fields[3]).text());
          const isolationDeath = parseInt($(fields[4]).text());
          const inspectionTotal = parseInt($(fields[5]).text());
          const inspectionProcess = parseInt($(fields[6]).text());
          const inspectionNegative = parseInt($(fields[7]).text());
          const total = parseInt($(fields[8]).text());

          const isolation: IStatIsolation = {
            total: isolationTotal,
            process: isolationProcess,
            release: isolationRelease,
            death: isolationDeath,
          };

          const inspection: IStatInspection = {
            total: inspectionTotal,
            process: inspectionProcess,
            negative: inspectionNegative,
          };

          StatModel.create({
            timestamp,
            state,
            isolation,
            inspection,
            increase,
            total,
          });
        } catch (err) {
          console.warn(err.message);
        }
      }
    } catch (err) {
      return false;
    }
  }

  private static getTimeByDisplay(datetime: string): Moment.Moment {
    const regex = new RegExp(
      /^([0-9]{1,4})년 ([0-9]{1,2})월 ([0-9]{1,2})일\((.{1})\) ([0-9]{1,2})시$/,
    );

    const exec = regex.exec(datetime);
    if (!exec || exec.length !== 6) throw Error('Cannot match regex');

    const year = String(exec[1]).padStart(4, '0');
    const month = String(exec[2]).padStart(2, '0');
    const day = String(exec[3]).padStart(2, '0');
    const time = String(exec[5]).padStart(2, '0');

    const moment = Moment(`${year}-${month}-${day}T${time}:00:00.000Z`);
    if (!moment.isValid()) throw Error('Invalid Time');

    return moment;
  }
}

export default CrawlerController;
