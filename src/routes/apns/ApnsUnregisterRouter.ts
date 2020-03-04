import Router from 'koa-router';
import { Context } from 'koa';
import ApnsController from '../../controllers/ApnsController';
import EStatus from '../../enums/EStatus';

const router = new Router();

router.get('/', async (ctx: Context) => {
  const { uuid } = ctx.query;
  const isUnregisted = await ApnsController.unregisterApns(uuid);
  ctx.body = isUnregisted ? EStatus.SUCCESS : EStatus.ERROR;
});

export default router;
