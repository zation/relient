import { stringify } from 'query-string';
import {
  any,
  prop,
  isObject,
  keys,
  flow,
} from 'lodash/fp';

declare const global;
const { File } = global;

const commonFetch = (
  method: string,
  url: string,
  data?: object,
  options?: object,
): object => {
  let finalData;
  let headers = {
    'content-type': 'application/json',
    ...prop('headers')(options),
  };
  if (File && isObject(data) && flow(keys, any((key) => data[key] instanceof File))(data)) {
    finalData = new FormData();
    if (data) {
      Object.keys(data).forEach((key) => {
        finalData.append(key, data[key]);
      });
    }
    headers = {};
  } else if (data) {
    finalData = JSON.stringify(data);
  }

  return {
    ...options,
    url,
    isApi: true,
    method,
    headers,
    body: finalData,
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
