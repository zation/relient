import {
  prop, curry, flow, map, isNil, isObject, isEmpty,
} from 'lodash/fp';

export const getEntity: (keyPath: string) => (state: object) => any = curry(
  (keyPath, state) => prop(`entities.${keyPath}`, state),
);

export const getEntityArray: (keyPath: string) => (state: object) => any[] = curry(
  (
    keyPath,
    state,
  ) => flow(prop(`entities[${keyPath}]`), map((value) => value))(state),
);

export const isEntityEmpty: (keyPath: string) => (state: object) => boolean = curry(
  (keyPath, state) => {
    const result = getEntity(keyPath)(state);
    return isNil(result) || (isObject(result) && isEmpty(result));
  },
);
