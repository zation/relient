import { omit, prop } from 'lodash/fp';

export default (schema) => (
  originalData,
  { meta },
) => omit([prop(schema.idAttribute)(meta)])(originalData);
