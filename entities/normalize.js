import { normalize as originalNormalize } from 'normalizr';

export default schema => data => originalNormalize(data, schema);
