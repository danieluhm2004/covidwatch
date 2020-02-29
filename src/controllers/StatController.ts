import EState from '../enums/EState';
import StatModel from '../models/StatModel';
import IStatIsolation from '../interfaces/IStatIsolation';
import IStatInspection from '../interfaces/IStatInspection';
import IStat from '../interfaces/IStat';

class StatController {
  public static async getInfo(state: EState = EState.TOTAL): Promise<IStat> {
    const stat = await StatModel.findOne({ state })
      .sort({ timestamp: -1 })
      .select('total increase');

    if (!stat) throw Error('Cannot find latest of stat.');
    return stat;
  }

  public static async getIsolation(
    state: EState = EState.TOTAL,
  ): Promise<IStatIsolation> {
    const stat = await StatModel.findOne({ state })
      .sort({ timestamp: -1 })
      .select('isolation');

    if (!stat) throw Error('Cannot find latest of stat.');
    return stat.isolation;
  }

  public static async getInspection(
    state: EState = EState.TOTAL,
  ): Promise<IStatInspection> {
    const stat = await StatModel.findOne({ state })
      .sort({ timestamp: -1 })
      .select('inspection');

    if (!stat) throw Error('Cannot find latest of stat.');
    return stat.inspection;
  }
}

export default StatController;
