import Router from 'koa-router';
import { Context } from 'koa';
import StatController from '../controllers/StatController';

const router = new Router();

router.get('/', async (ctx: Context) => {
  ctx.body = await StatController.getInspection(ctx.stateType);
});

export default router;
