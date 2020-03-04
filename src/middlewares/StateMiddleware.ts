import { Context, Next } from 'koa';
import StateController from '../controllers/StateController';
import EState from '../enums/EState';

async function StateMiddleware(ctx: Context, next: Next) {
  ctx.stateType = EState.TOTAL;
  if (ctx.params.state) {
    ctx.stateType = StateController.getStateByText(ctx.params.state);
  }

  await next();
}

export default StateMiddleware;
