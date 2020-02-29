import Router from 'koa-router';
import { Context } from 'koa';
import InspectionMiddleware from '../middlewares/InspectionMiddleware';

const router = new Router();

router.use(InspectionMiddleware);
router.get('/', async (ctx: Context) => {
  ctx.body = ctx.stat;
});

router.get('/total', async (ctx: Context) => {
  ctx.body = ctx.stat.total;
});

router.get('/process', async (ctx: Context) => {
  ctx.body = ctx.stat.process;
});

router.get('/negative', async (ctx: Context) => {
  ctx.body = ctx.stat.negative;
});

export default router;
