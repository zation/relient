// TODO: remove below when ts 3.8 is supported by typescript-eslint: https://github.com/typescript-eslint/typescript-eslint/issues/1436
// eslint-disable-next-line import/no-unresolved
import type { History } from 'history';
import { startsWith } from 'lodash/fp';
import {
  PUSH, REPLACE, GO, GO_FORWARD, GO_BACK,
} from '../actions/history';
import getConfig from '../config';

const baseUrl = getConfig('baseUrl');

export default (history: History) => () => (next) => (action) => {
  const { payload, type } = action;

  if (type === PUSH) {
    const [pathname, hash] = payload.split('#');
    if (startsWith(baseUrl)(pathname) || startsWith(`/${baseUrl}`)(pathname) || startsWith(baseUrl)(`/${pathname}`)) {
      history.push({ pathname, hash });
    } else {
      history.push({
        pathname: `/${baseUrl}/${pathname}`.replace(/([^:]\/)\/+/g, '$1'),
        hash,
      });
    }

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
