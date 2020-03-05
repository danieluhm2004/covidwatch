import StatController from '../../controllers/StatController';
import StateController from '../../controllers/StateController';
import IState from '../../interfaces/IState';
import IStat from '../../interfaces/IStat';

const defaultState: IState = { state: 'total' };

const Query = {
  getState: async (_: any, { state }: IState = defaultState) =>
    await StatController.getEverything(StateController.getStateByText(state)),

  getIncrease: async (_: any, { state }: IState = defaultState) =>
    await StatController.getIncrease(StateController.getStateByText(state)),

  getConfirmator: async (_: any, { state }: IState = defaultState) =>
    await StatController.getConfirmator(StateController.getStateByText(state)),

  getDeath: async (_: any, { state }: IState = defaultState) =>
    await StatController.getDeath(StateController.getStateByText(state)),

  getIncidence: async (_: any, { state }: IState = defaultState) =>
    await StatController.getIncidence(StateController.getStateByText(state)),

  getInspection: async (_: any, { state }: IState = defaultState) =>
    await StatController.getInspection(StateController.getStateByText(state)),

  whenUpdate: async (_: any, { state }: IState = defaultState) =>
    await StatController.whenUpdate(StateController.getStateByText(state)),
};

export default Query;
