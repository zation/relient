import { identity } from 'lodash/fp';
import {
  ActionCreator,
  bindActionCreators,
} from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { Action } from './interface';

export const actionTypeCreator = (prefix: string) => (actionName: string): string => `~${prefix}#${actionName}`;

export const useAction = <A, C extends ActionCreator<A>>(actionCreator: C, deps = []) => {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators<A, C>(actionCreator, dispatch),
    [dispatch, ...deps],
  );
};

export const createSimpleAction = (type: string) => (): Action<undefined, undefined> => ({ type });

export function createAction<ParamsAndPayloadAndMeta>(
  type: string,
): (params: ParamsAndPayloadAndMeta) => Action<ParamsAndPayloadAndMeta, ParamsAndPayloadAndMeta>;

export function createAction<Params, PayloadAndMeta>(
  type: string,
  payloadCreator: (params: Params) => PayloadAndMeta,
): (params: Params) => Action<PayloadAndMeta, PayloadAndMeta>;

export function createAction<Params, Payload, Meta>(
  type: string,
  payloadCreator: (params: Params) => Payload,
  metaCreator: (params: Params) => Meta,
): (params: Params) => Action<Payload, Meta>;

export function createAction<Params, Payload, Meta>(
  type: string,
  payloadCreator: (params: Params) => Payload = identity,
  metaCreator: (params: Params) => Meta = identity,
) {
  return (params: Params): Action<Payload, Meta> => ({
    type,
    payload: payloadCreator(params),
    meta: metaCreator(params),
  });
}

export {
  read,
  post,
  del,
  patch,
  put,
} from './request';
export type {
  APIActionPayload,
  APIActionCreator,
  APIAction,
  Action,
} from './interface';
