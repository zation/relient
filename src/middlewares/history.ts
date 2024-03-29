import type { History } from 'history';
import type { Middleware } from 'redux';
import {
  PUSH,
  REPLACE,
  GO,
  GO_FORWARD,
  GO_BACK,
} from '../actions/history';

export default (history: History): Middleware => () => (next) => (action) => {
  const { payload, type } = action;

  if (type === PUSH) {
    const [pathname, hash] = payload.split('#');
    history.push({ pathname, hash });
    return next({ ...action, payload: history.location });
  }
  if (type === REPLACE) {
    history.replace(payload);
    return next({ ...action, payload: history.location });
  }
  if (type === GO) {
    history.go(payload);
    return next({ ...action, payload: history.location });
  }
  if (type === GO_FORWARD) {
    history.forward();
    return next({ ...action, payload: history.location });
  }
  if (type === GO_BACK) {
    history.back();
    return next({ ...action, payload: history.location });
  }
  return next(action);
};
