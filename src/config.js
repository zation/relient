import { propertyOf, pick, flow } from 'lodash/fp';
import serialize from 'serialize-javascript';

if (!global.reboxesConfig) {
  global.reboxesConfig = {
    DNS_DOMAIN: process.env.DNS_DOMAIN,
    API_DOMAIN: process.env.API_DOMAIN,
    GOOGLE_TRACKING_ID: process.env.GOOGLE_TRACKING_ID,
    PORT: process.env.PORT || 3000,
  };
}

const config = global.reboxesConfig;
const clientConfigs = ['DNS_DOMAIN', 'API_DOMAIN'];

export const getConfig = propertyOf(config);
export const initClientConfig = `window.reboxesConfig=${flow(pick(clientConfigs), serialize)(config)}`;
