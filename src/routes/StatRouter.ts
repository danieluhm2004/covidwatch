import Router from 'koa-router';
import { Context } from 'koa';
import StatController from '../controllers/StatController';
import StateController from '../controllers/StateController';
import EState from '../enums/EState';

const router = new Router();

router.get('/', async (ctx: Context) => {
  let state = EState.TOTAL;
  if (ctx.params.state) {
    state = StateController.getStateByText(ctx.params.state);
  }

  const stat = await StatController.getInfo(state);
  ctx.body = stat;
});

router.get('/total', async (ctx: Context) => {
  let state = EState.TOTAL;
  if (ctx.params.state) {
    state = StateController.getStateByText(ctx.params.state);
  }

  const stat = await StatController.getInfo(state);
  ctx.body = stat.total;
});

router.get('/increase', async (ctx: Context) => {
  let state = EState.TOTAL;
  if (ctx.params.state) {
    state = StateController.getStateByText(ctx.params.state);
  }

  const stat = await StatController.getInfo(state);
  ctx.body = stat.increase;
});

export default router;
