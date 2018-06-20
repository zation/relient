import serialize from 'serialize-javascript';
import { pick, flow } from 'lodash/fp';

const { __RELIENT_CONFIG__ } = global;

export default `window.__RELIENT_CONFIG__ = ${flow(pick(__RELIENT_CONFIG__.clientConfigs), serialize)(__RELIENT_CONFIG__)}`;
