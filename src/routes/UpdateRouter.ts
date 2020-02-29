import Router from 'koa-router';
import { Context } from 'koa';
import EStatus from '../enums/EStatus';
import CrawlerController from '../controllers/CrawlerController';

const router = new Router();

router.get('/', async (ctx: Context) => {
  await CrawlerController.requestCrawling();
  ctx.body = EStatus.SUCCESS;
});

export default router;
