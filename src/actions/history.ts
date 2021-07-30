import type { History, To } from 'history';
import {
  createAction,
  actionTypeCreator,
  createSimpleAction,
} from './index';

const actionType = actionTypeCreator('@relient/history');

export const INIT = actionType('INIT');
export const PUSH = actionType('PUSH');
export const REPLACE = actionType('REPLACE');
export const GO = actionType('GO');
export const GO_BACK = actionType('GO_BACK');
export const GO_FORWARD = actionType('GO_FORWARD');

export const init = createAction<History>(INIT);
export const push = createAction<To>(PUSH);
export const replace = createAction<To>(REPLACE);
export const go = createAction<number>(GO);
export const goBack = createSimpleAction(GO_BACK);
export const goForward = createSimpleAction(GO_FORWARD);
