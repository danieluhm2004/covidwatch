import IApnsToken from '../../interfaces/IApnsToken';
import ApnsController from '../../controllers/ApnsController';
import CrawlerController from '../../controllers/CrawlerController';

const Mutation = {
  requestUpdate: async (_: any): Promise<boolean> =>
    await CrawlerController.requestCrawling(),

  registerApns: async (_: any, { uuid, token }: IApnsToken) =>
    await ApnsController.registerApns(uuid, token!),

  unregisterApns: async (_: any, { uuid }: IApnsToken) =>
    await ApnsController.unregisterApns(uuid),
};

export default Mutation;
