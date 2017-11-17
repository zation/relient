import { propertyOf, pick, flow } from 'lodash/fp';
import serialize from 'serialize-javascript';

const CLIENT_CONFIGS = [
  'DNS_DOMAIN',
  'API_DOMAIN',
];

const config = global.relientConfig;

export const getConfig = propertyOf(config);
export const initClientConfig = `window.relientConfig=${flow(pick(CLIENT_CONFIGS), serialize)(config)}`;
