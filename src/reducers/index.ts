import {
  handleActions as _handleActions,
  combineActions as _combineActions,
  Reducer,
  ActionFunctions,
} from 'redux-actions';
import {
  combineReducers,
  ReducersMapObject,
} from 'redux';
import {
  reduce,
  intersection,
} from 'lodash/fp';
import type { Location } from 'history';
import {
  GO,
  GO_BACK,
  GO_FORWARD,
  INIT,
  PUSH,
  REPLACE,
} from '../actions/history';
import { THROW_SERVER_ERROR } from '../actions/server-error';
import { SET_FEATURE } from '../actions/feature';

export { schema } from 'normalizr';
export {
  combineActions,
  handleActions,
} from 'redux-actions';
export { default as merge } from './merge';
export { default as normalize } from './normalize';
export { default as replace } from './replace';
export { default as remove } from './remove';

declare module 'redux-actions' {
  // https://github.com/redux-utilities/redux-actions/blob/v2.3.0/src/combineActions.js#L21
  export function combineActions(
    ...actionTypes: Array<ActionFunctions<any> | string | symbol>
  ): string;
}

export const feature = {
  feature: _handleActions<string | null>({
    [SET_FEATURE]: (_, { payload }) => payload,

  }, null),
};

export const history = {
  history: _handleActions<Location | null>({
    [_combineActions(
      PUSH,
      GO_BACK,
      GO_FORWARD,
      REPLACE,
      GO,
      INIT,
    )]: (_, { payload }) => payload,
  }, null),
};

export const serverError = {
  serverError: _handleActions<Record<string, any>>({
    [THROW_SERVER_ERROR]: (state, action) => ({
      ...state,
      [(new Date()).toISOString()]: action,
    }),
  }, {}),
};

export interface EntityReducer<Payload = any, Meta = any> {
  [entityKey: string]: Reducer<Payload, Meta>
}

export const createEntitiesReducer = (
  entityReducers: EntityReducer[],
): ReducersMapObject<any, any> => ({
  ...serverError,
  ...history,
  ...feature,
  entities: combineReducers({
    ...reduce((
      result,
      item: EntityReducer,
    ) => {
      const duplicatedKeys = intersection(Object.keys(item))(Object.keys(result));
      if (duplicatedKeys.length > 0) {
        console.warn(`Duplicated entity reducer keys: ${duplicatedKeys.join(', ')}`);
      }
      return { ...result, ...item };
    }, {})(entityReducers),
  }),
});
