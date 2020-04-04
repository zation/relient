// TODO: remove below when ts 3.8 is supported by typescript-eslint: https://github.com/typescript-eslint/typescript-eslint/issues/1436
// eslint-disable-next-line import/no-unresolved
import type { History } from 'history';
import {
  PUSH, REPLACE, GO, GO_FORWARD, GO_BACK,
} from '../actions/history';

export default (history: History) => () => (next) => (action) => {
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
    history.goForward();
    return next({ ...action, payload: history.location });
  }
  if (type === GO_BACK) {
    history.goBack();
    return next({ ...action, payload: history.location });
  }
  return next(action);
};
