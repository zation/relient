import { prop, constant } from 'lodash/fp';
import type { RequestInfo, RequestInit, Response } from 'node-fetch';
import type { Middleware } from 'redux';

import { throwServerError } from '../actions/server-error';

const deserialize = (response: Response): Promise<any> => {
  const header = response.headers.get('Content-Type') || '';
  if (header.indexOf('application/json') > -1) {
    return response.json();
  }
  if (header.indexOf('application/octet-stream') > -1) {
    return response.arrayBuffer();
  }
  return response.text();
};

export default <State>({
  fetch,
  apiDomain: globalApiDomain,
  getDefaultHeader = constant({}),
}: {
  fetch: (
    url: RequestInfo,
    init?: RequestInit,
  ) => Promise<Response>,
  apiDomain: string,
  getDefaultHeader: (params: { getState: () => State, withoutAuth: boolean }) => object
}): Middleware<{}, State> => ({
  getState,
  dispatch,
}) => (next) => async (action) => {
  const { payload, meta } = action;
  if (payload) {
    const {
      url, isApi, withoutAuth, apiDomain, ...options
    } = payload;
    if (isApi) {
      const response = await fetch(`${apiDomain || globalApiDomain}${url}`, {
        ...options,
        credentials: 'same-origin',
        headers: {
          ...getDefaultHeader({ getState, withoutAuth }),
          ...options.headers,
        },
      });
      const data = await deserialize(response);
      if (response.status >= 200 && response.status < 300) {
        next({ ...action, payload: data });
        return data;
      }

      dispatch(throwServerError(data, {
        status: response.status,
        statusText: response.statusText,
        ignoreGlobalWarning: prop('ignoreGlobalWarning')(meta),
        ignoreAuthRedirection: prop('ignoreAuthRedirection')(meta),
        originalAction: action,
      }));
      throw data;
    }
  }
  return next(action);
};
