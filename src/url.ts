import { startsWith } from 'lodash/fp';

export const getWithProtocol = (url: string): string => (
  startsWith('http')(url) ? url : `http://${url}`
);

export const getWithSecureProtocol = (url: string): string => (
  startsWith('http')(url) ? url : `https://${url}`
);

export const stripUrl = (url: string): string => url.replace(/\/\/+/g, '/');

export const getWithBaseUrl = (
  url: string,
  baseUrl?: string,
): string => (baseUrl ? stripUrl(`/${baseUrl}/${url}`) : url);
