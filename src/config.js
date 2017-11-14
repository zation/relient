import { propertyOf, pick } from 'lodash/fp';

const config = {
  DNS_DOMAIN: process.env.DNS_DOMAIN,
  API_Domain: process.env.API_Domain,
};

export const getConfig = propertyOf(config);
export const getConfigs = names => (names ? pick(names)(config) : config);
