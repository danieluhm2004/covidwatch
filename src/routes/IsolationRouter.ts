import Router from 'koa-router';
import { Context } from 'koa';
import IsolationMiddleware from '../middlewares/IsolationMiddleware';

const router = new Router();

router.use(IsolationMiddleware);
router.get('/', async (ctx: Context) => {
  ctx.body = ctx.stat;
});

router.get('/total', async (ctx: Context) => {
  ctx.body = ctx.stat.total;
});

router.get('/process', async (ctx: Context) => {
  ctx.body = ctx.stat.process;
});

router.get('/release', async (ctx: Context) => {
  ctx.body = ctx.stat.release;
});

router.get('/death', async (ctx: Context) => {
  ctx.body = ctx.stat.death;
});

export default router;
