import { prop } from 'lodash/fp';

import { getEntity } from '../selectors';
import { throwServerError } from '../actions/server-error';

const deserialize = (response) => {
  const header = response.headers.get('Content-Type') || '';
  if (header.indexOf('application/json') > -1) {
    return response.json();
  }
  if (header.indexOf('application/octet-stream') > -1) {
    return response.arrayBuffer();
  }
  return response.text();
};

export default ({ fetch, authorizationPath, apiDomain: globalApiDomain }) =>
  ({ getState, dispatch }) => next => async (action) => {
    const { payload, meta } = action;
    if (payload) {
      const { url, isApi, withoutAuth, apiDomain, ...options } = payload;
      if (isApi) {
        const authorization = getEntity(authorizationPath)(getState());
        const response = await fetch(`${apiDomain || globalApiDomain}${url}`, {
          ...options,
          headers: {
            ...options.headers,
            ...(!withoutAuth && authorization ? { 'x-auth-token': authorization } : {}),
          },
        });
        const data = await deserialize(response);
        if (response.status >= 200 && response.status < 300) {
          dispatch({ ...action, payload: data });
          return data;
        }

        dispatch(throwServerError(data, {
          status: response.status,
          statusText: response.statusText,
          ignoreGlobalWarning: prop('ignoreGlobalWarning')(meta),
          ignoreAuthRedirection: prop('ignoreAuthRedirection')(meta),
        }));
        throw data;
      }
    }
    return next(action);
  };
