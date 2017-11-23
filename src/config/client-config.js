import serialize from 'serialize-javascript';
import { pick } from 'lodash/fp';

// eslint-disable-next-line
const { __RELIENT_CONFIG__ } = global;

export default `window.__RELIENT_CONFIG__=${serialize(pick(__RELIENT_CONFIG__.clientConfigs)(__RELIENT_CONFIG__))}`;
