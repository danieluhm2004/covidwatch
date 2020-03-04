import StatModel from '../models/StatModel';
import Moment from 'moment';
import Cheerio from 'cheerio';
import Got from 'got';
import StateController from './StateController';

class CrawlerController {
  private static url = 'http://ncov.mohw.go.kr/bdBoardList_Real.do?brdGubun=13';
  /* brdGubun: 11 -> 발생동향 | 12 -> 확진환자 이동경로 | 13 -> 시도별 발생동향 */

  public static async requestCrawling(): Promise<boolean> {
    const isOutdated = await CrawlerController.isOutdated();
    if (!isOutdated) return false;

    return await CrawlerController.onRequest();
  }

  private static async isOutdated(): Promise<boolean> {
    const latestOne = await StatModel.findOne()
      .sort({ updateAt: -1 })
      .select('updateAt');

    if (!latestOne) return true;
    const updateAt = Moment(latestOne.updateAt);
    updateAt.add(3, 'minutes'); // 3분 내로 업데이트시 거절.
    if (!updateAt.isBefore()) return false;
    return true;
  }

  private static async onRequest(): Promise<boolean> {
    try {
      const beforeRows = await StatModel.countDocuments();
      const res = await Got(this.url);
      const $ = Cheerio.load(res.body);

      const displayTime = $('.timetable > p > span').text();
      const updateAt: Date = CrawlerController.getTimeByDisplay(displayTime);
      const rows = $('tbody > tr').toArray();

      for (const row of rows) {
        try {
          const _$ = $(row);
          const displayState = _$.find('th').text();
          const state = StateController.getStateByDisplay(displayState);
          const fields = _$.find('td.number').toArray();
          const increase = CrawlerController.parseInt($, fields[0]);
          const confirmator = CrawlerController.parseInt($, fields[1]);
          const death = CrawlerController.parseInt($, fields[2]);
          const incidence = CrawlerController.parseInt($, fields[3]);
          const inspection = CrawlerController.parseInt($, fields[4]);

          await StatModel.updateOne(
            {
              updateAt,
              state,
            },
            {
              updateAt,
              state,
              increase,
              confirmator,
              death,
              incidence,
              inspection,
            },
            {
              upsert: true,
            },
          );
        } catch (err) {
          console.warn(err.message);
        }
      }

      const afterRows = await StatModel.countDocuments();
      return afterRows - beforeRows !== 0;
    } catch (err) {
      return false;
    }
  }

  private static getTimeByDisplay(datetime: string): Date {
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

    return moment.toDate();
  }

  private static parseInt($: CheerioStatic, field: any): number {
    return parseInt(
      $(field)
        .text()
        .replace(/,/, ''),
    );
  }
}

export default CrawlerController;
