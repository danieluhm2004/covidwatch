import Router from 'koa-router';
import { Context } from 'koa';
import ApnsController from '../../controllers/ApnsController';
import EStatus from '../../enums/EStatus';

const router = new Router();

router.get('/', async (ctx: Context) => {
  const { uuid, token } = ctx.query;
  const isRegisted = await ApnsController.registerApns(uuid, token);
  ctx.body = isRegisted ? EStatus.SUCCESS : EStatus.ERROR;
});

export default router;
