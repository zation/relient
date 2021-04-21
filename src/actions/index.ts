import { identity } from 'lodash/fp';

export const actionTypeCreator = (prefix: string) => (actionName: string): string => `~${prefix}#${actionName}`;

export const createSimpleAction = (type: string) => () => ({ type });

export function createAction<ParamsAndPayloadAndMeta>(
  type: string
): (params: ParamsAndPayloadAndMeta) => {
  type: string
  payload: ParamsAndPayloadAndMeta
  meta: ParamsAndPayloadAndMeta
};

export function createAction<Params, PayloadAndMeta>(
  type: string,
  payloadCreator: (params: Params) => PayloadAndMeta,
): (params: Params) => {
  type: string
  payload: PayloadAndMeta
  meta: PayloadAndMeta
};

export function createAction<Params, Payload, Meta>(
  type: string,
  payloadCreator: (params: Params) => Payload,
  metaCreator: (params: Params) => Meta
): (params: Params) => {
  type: string
  payload: Payload
  meta: Meta
};

export function createAction<Params, Payload, Meta>(
  type: string,
  payloadCreator: (params: Params) => Payload = identity,
  metaCreator: (params: Params) => Meta = identity,
) {
  return (params: Params) => ({
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
