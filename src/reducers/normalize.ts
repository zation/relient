import { normalize as originalNormalize, Schema } from 'normalizr';

export default <T = any>(schema: Schema<T>) => (data: any) => originalNormalize(data, schema);
