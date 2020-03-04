import Router from 'koa-router';
import ApnsRegisterRouter from './ApnsRegisterRouter';
import ApnsUnregisterRouter from './ApnsUnregisterRouter';

const router = new Router();

router.use(
  '/register',
  ApnsRegisterRouter.routes(),
  ApnsRegisterRouter.allowedMethods(),
);

router.use(
  '/unregister',
  ApnsUnregisterRouter.routes(),
  ApnsUnregisterRouter.allowedMethods(),
);

export default router;
