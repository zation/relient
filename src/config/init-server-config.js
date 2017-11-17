import path from 'path';
import { keys, flow, pick } from 'lodash/fp';

let config = {};
try {
  // eslint-disable-next-line
  config = require(path.resolve('./.relientrc.js'));
  // eslint-disable-next-line
} catch (error) {}

const DEFAULT_CONFIGS = {
  DNS_DOMAIN: null,
  API_DOMAIN: null,
  GOOGLE_TRACKING_ID: null,
  PORT: 3000,
};
const configNames = keys(DEFAULT_CONFIGS);

global.relientConfig = {
  ...DEFAULT_CONFIGS,
  ...flow(pick(configNames))(config),
  ...flow(pick(configNames))(process.env),
};
