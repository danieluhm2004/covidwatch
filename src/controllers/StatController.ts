import EState from '../enums/EState';
import StatModel from '../models/StatModel';
import IStat from '../interfaces/IStat';

class StatController {
  public static async getEverything(
    state: EState = EState.TOTAL,
    optional: string = '-_id -__v -state',
  ): Promise<IStat> {
    const stat = await StatModel.findOne({ state })
      .sort({ updateAt: -1 })
      .select(optional);

    if (!stat) throw Error('Cannot find state stat');
    return stat;
  }

  public static async getIncrease(
    state: EState = EState.TOTAL,
  ): Promise<number> {
    const query = await StatController.getEverything(state, 'increase');
    if (!query || !query.increase) return NaN;

    return query.increase;
  }

  public static async getConfirmator(
    state: EState = EState.TOTAL,
  ): Promise<number> {
    const query = await StatController.getEverything(state, 'confirmator');
    if (!query || !query.confirmator) return NaN;

    return query.confirmator;
  }

  public static async getDeath(state: EState = EState.TOTAL): Promise<number> {
    const query = await StatController.getEverything(state, 'death');
    if (!query || !query.death) return NaN;

    return query.death;
  }

  public static async getIncidence(
    state: EState = EState.TOTAL,
  ): Promise<number> {
    const query = await StatController.getEverything(state, 'incidence');
    if (!query || !query.incidence) return NaN;

    return query.incidence;
  }

  public static async getInspection(
    state: EState = EState.TOTAL,
  ): Promise<number> {
    const query = await StatController.getEverything(state, 'inspection');
    if (!query || !query.inspection) return NaN;

    return query.inspection;
  }

  public static async whenUpdate(state: EState = EState.TOTAL): Promise<Date> {
    const query = await StatController.getEverything(state, 'updateAt');
    if (!query || !query.updateAt) return new Date(0);

    return query.updateAt;
  }
}

export default StatController;
