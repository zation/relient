import { propertyOf, pick } from 'lodash/fp';

const { env: { DNSDomain, APIDomain } } = process;

const config = {
  DNSDomain,
  APIDomain,
};

export const getConfig = propertyOf(config);
export const getConfigs = names => (names ? pick(names)(config) : config);
