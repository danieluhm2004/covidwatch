import Router from 'koa-router';
import EStatus from '../enums/EStatus';
import StatRouter from './StatRouter';
import IncreaseRouter from './IncreaseRouter';
import ConfirmatorRouter from './ConfirmatorRouter';
import DeathRouter from './DeathRouter';
import IncidenceRouter from './IncidenceRouter';
import InspectionRouter from './InspectionRouter';
import UpdateRouter from './UpdateRouter';
import StateMiddleware from '../middlewares/StateMiddleware';
import Apns from './apns';

const router = new Router();

router.use('/apns', Apns.routes(), Apns.allowedMethods());

router.use(
  ['/increase', '/:state/increase'],
  StateMiddleware,
  IncreaseRouter.routes(),
  IncreaseRouter.allowedMethods(),
);

router.use(
  ['/confirmator', '/:state/confirmator'],
  StateMiddleware,
  ConfirmatorRouter.routes(),
);

router.use(
  ['/death', '/:state/death'],
  StateMiddleware,
  DeathRouter.routes(),
  DeathRouter.allowedMethods(),
);

router.use(
  ['/incidence', '/:state/incidence'],
  StateMiddleware,
  IncidenceRouter.routes(),
  IncidenceRouter.allowedMethods(),
);

router.use(
  ['/inspection', '/:state/inspection'],
  StateMiddleware,
  InspectionRouter.routes(),
  InspectionRouter.allowedMethods(),
);

router.use(
  ['/update', '/:state/update'],
  StateMiddleware,
  UpdateRouter.routes(),
  UpdateRouter.allowedMethods(),
);

router.use(
  '/:state',
  StateMiddleware,
  StatRouter.routes(),
  StatRouter.allowedMethods(),
);

router.get('/', (ctx) => {
  ctx.body = {
    status: EStatus.SUCCESS,
    name: process.env.npm_package_name,
    version: process.env.npm_package_version,
  };
});

export default router;
