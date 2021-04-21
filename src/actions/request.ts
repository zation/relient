import { stringify } from 'query-string';
import {
  any,
  prop,
  isObject,
  keys,
  flow,
} from 'lodash/fp';

const { File } = global;

type Data = any;

const commonFetch = (
  method: string,
  url: string,
  data?: Data,
  options?: RequestInit,
): object => {
  let body: FormData | string | undefined;
  let headers = {
    'content-type': 'application/json',
    ...prop('headers')(options),
  };
  if (File && isObject(data) && flow(
    keys,
    any((key: string) => (data as Record<string, any>)[key] instanceof File),
  )(
    data)) {
    body = new FormData();
    Object.keys(data).forEach((key) => {
      (body as FormData).append(key, (data as Record<string, any>)[key]);
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
  query?: Record<string, any>,
  options?: RequestInit,
) => commonFetch('GET', query ? `${url}?${stringify(query)}` : url, undefined, options);

export const post = (
  url: string,
  data?: Data,
  options?: RequestInit,
) => commonFetch('POST', url, data, options);

export const put = (
  url: string,
  data?: Data,
  options?: RequestInit,
) => commonFetch('PUT', url, data, options);

export const patch = (
  url: string,
  data?: Data,
  options?: RequestInit,
) => commonFetch('PATCH', url, data, options);

export const del = (
  url: string,
  query?: Data,
  options?: RequestInit,
) => commonFetch('DELETE', query ? `${url}?${stringify(query)}` : url, undefined, options);
