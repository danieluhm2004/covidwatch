import Router from 'koa-router';
import EStatus from '../enums/EStatus';
import InspectionRouter from './InspectionRouter';
import IsolationRouter from './IsolationRouter';
import UpdateRouter from './UpdateRouter';
import StatRouter from './StatRouter';

const router = new Router();

router.use('/:state', StatRouter.routes());
router.use('/:state/inspection', InspectionRouter.routes());
router.use('/:state/isolation', IsolationRouter.routes());
router.use('/update', UpdateRouter.routes());

router.get('/', (ctx) => {
  ctx.body = {
    status: EStatus.SUCCESS,
    name: process.env.npm_package_name,
    version: process.env.npm_package_version,
  };
});

export default router;
