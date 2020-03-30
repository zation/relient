/* eslint-disable no-underscore-dangle */

import { prop } from 'lodash/fp';

declare const __BROWSER__: boolean;

export default (property: string): any => {
  if (property === null || property === undefined) {
    throw new Error('Calling getConfig with null or undefined argument');
  }
  if (!__BROWSER__) {
    // eslint-disable-next-line global-require
    const config = require('config');
    return config.get(property);
  }
  const value = prop(`__RELIENT_CONFIG__.${property}`)(global);
  if (value === undefined) {
    throw new Error(`Configuration property "${property}" is not defined`);
  }
  return value;
};
