import EnvVar from 'envvar';
import { propertyOf, pick } from 'lodash/fp';

const config = {
  DNSDomain: EnvVar.string('DNSDomain'),
  APIDomain: EnvVar.string('APIDomain'),
};

export const getConfig = propertyOf(config);
export const getConfigs = names => (names ? pick(names)(config) : config);
