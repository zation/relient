import { startsWith } from 'lodash/fp';
import type { Middleware } from 'redux';
import { PUSH } from '../actions/history';
import { getWithBaseUrl } from '../url';
import { getFeatureBy } from '../features';

export default <State>(baseUrl: string): Middleware<{}, State> => () => (next) => (action) => {
  const {
    payload,
    type,
  } = action;

  if (type === PUSH && !startsWith('.')(payload) && !startsWith('/')(payload)) {
    return next({
      ...action,
      payload: getWithBaseUrl(getFeatureBy('link')(payload), baseUrl),
    });
  }

  return next(action);
};
