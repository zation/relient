import { stringify } from 'query-string';
import {
  any,
  prop,
  isObject,
  keys,
  flow,
} from 'lodash/fp';

const { File } = global;

const commonFetch = (
  method: string,
  url: string,
  data?: { [key: string]: any },
  options?: object,
): object => {
  let body: FormData | string | undefined;
  let headers = {
    'content-type': 'application/json',
    ...prop('headers')(options),
  };
  if (File && isObject(data) && flow(keys, any((key: string) => data[key] instanceof File))(data)) {
    body = new FormData();
    Object.keys(data).forEach((key) => {
      (body as FormData).append(key, data[key]);
    });
    headers = {};
  } else if (data) {
    body = JSON.stringify(data);
  }

  return {
    ...options,
    url,
    isApi: true,
    method,
    headers,
    body,
  };
};

export const read = (
  url: string,
  query?: object,
  options?: object,
) => commonFetch('GET', query ? `${url}?${stringify(query)}` : url, undefined, options);

export const post = (
  url: string,
  data?: object,
  options?: object,
) => commonFetch('POST', url, data, options);

export const put = (
  url: string,
  data?: object,
  options?: object,
) => commonFetch('PUT', url, data, options);

export const patch = (
  url: string,
  data?: object,
  options?: object,
) => commonFetch('PATCH', url, data, options);

export const del = (
  url: string,
  query?: object,
  options?: object,
) => commonFetch('DELETE', query ? `${url}?${stringify(query)}` : url, undefined, options);
