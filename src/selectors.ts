import {
  prop, curry, flow, map, isNil, isObject, isEmpty,
} from 'lodash/fp';

export const getEntity: <T = any>(keyPath: string) => (state: any) => T = curry(
  (keyPath: string, state: any) => prop(`entities.${keyPath}`, state),
);

export const getEntityArray: <T = any>(keyPath: string) => (state: any) => T[] = curry(
  (
    keyPath: string,
    state: any,
  ) => flow(prop(`entities[${keyPath}]`), map((value) => value))(state),
);

export const isEntityEmpty: (keyPath: string) => (state: any) => boolean = curry(
  (keyPath: string, state: any) => {
    const result = getEntity(keyPath)(state);
    return isNil(result) || (isObject(result) && isEmpty(result));
  },
);
