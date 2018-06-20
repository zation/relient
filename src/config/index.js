/* eslint-disable no-underscore-dangle */

import { propertyOf, pick, keys } from 'lodash/fp';

if (!__BROWSER__ && !global.__RELIENT_CONFIG__) {
  const customConfig = __RELIENT_CONFIG__;
  global.__RELIENT_CONFIG__ = {
    ...customConfig,
    ...pick(keys(customConfig))(process.env),
  };
}

export default propertyOf(global.__RELIENT_CONFIG__);
