import serialize from 'serialize-javascript';
import {
  flow, isArray, zipObject, map,
} from 'lodash/fp';
import config from 'config';

export default (attributes) => {
  if (!isArray(attributes) || attributes.length < 1) {
    throw new Error('Attributes should not be empty');
  }
  return `window.__RELIENT_CONFIG__ = ${flow(map(config.get.bind(config)), zipObject(attributes), serialize)(attributes)}`;
};
