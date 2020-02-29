import { Context, Next } from 'koa';
import EState from '../enums/EState';
import StateController from '../controllers/StateController';
import StatController from '../controllers/StatController';

async function InspectionMiddleware(ctx: Context, next: Next) {
  let state = EState.TOTAL;
  if (ctx.params.state) {
    state = StateController.getStateByText(ctx.params.state);
  }

  ctx.stat = await StatController.getInspection(state);
  if (!ctx.stat) {
    ctx.status = 404;
    ctx.body = 'Cannot find State';
  } else {
    await next();
  }
}

export default InspectionMiddleware;
