import ApnsModel from '../models/ApnsModel';

class ApnsController {
  public static async registerApns(
    uuid: string,
    token: string,
  ): Promise<boolean> {
    if (!uuid || !token) return false;

    try {
      const conditions = { uuid };
      const doc = { uuid, token, enabled: true, updateAt: new Date() };
      const options = { upsert: true };
      await ApnsModel.updateOne(conditions, doc, options);
      return true;
    } catch (err) {
      return false;
    }
  }

  public static async unregisterApns(uuid: string): Promise<boolean> {
    if (!uuid) return false;

    try {
      const conditions = { uuid };
      const doc = { enabled: false, updateAt: new Date() };
      await ApnsModel.updateOne(conditions, doc);
      return true;
    } catch (err) {
      return false;
    }
  }
}

export default ApnsController;
