import Router from 'koa-router';
import { Context } from 'koa';
import EStatus from '../enums/EStatus';
import CrawlerController from '../controllers/CrawlerController';
import StatController from '../controllers/StatController';

const router = new Router();

router.get('/', async (ctx: Context) => {
  ctx.body = await StatController.whenUpdate(ctx.stateType);
});

router.get('/renewal', async (ctx: Context) => {
  await CrawlerController.requestCrawling();
  ctx.body = EStatus.SUCCESS;
});

export default router;
