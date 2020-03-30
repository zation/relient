import {
  handleActions as _handleActions,
  combineActions as _combineActions,
  Reducer,
} from 'redux-actions';
import { combineReducers, ReducersMapObject } from 'redux';
import { reduce } from 'lodash/fp';
import {
  GO,
  GO_BACK,
  GO_FORWARD,
  INIT,
  PUSH,
  REPLACE,
} from '../actions/history';

import { THROW_SERVER_ERROR } from '../actions/server-error';

export { schema } from 'normalizr';
export { default as merge } from './merge';
export { default as normalize } from './normalize';
export { default as replace } from './replace';
export { default as remove } from './remove';

export const handleActions = _handleActions;
export const combineActions = _combineActions;

export const history = {
  history: handleActions({
    [combineActions(
      PUSH,
      GO_BACK,
      GO_FORWARD,
      REPLACE,
      GO,
      INIT,
    )]: (_, { payload }) => payload,
  }, {}),
};

export const serverError = {
  serverError: handleActions({
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
): ReducersMapObject => ({
  entities: combineReducers({
    ...serverError,
    ...history,
    ...reduce((
      result,
      item: any,
    ) => ({ ...result, ...item }), {})(entityReducers),
  }),
});
